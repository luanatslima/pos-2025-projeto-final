import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Todos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', user: 1 });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', user: 1, completed: false });

  const load = async () => {
    const data = await request('/todos/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/todos/', {
      method: 'POST',
      body: JSON.stringify({ ...form, completed: false }),
    });
    setForm({ title: '', user: 1 });
    load();
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setDraft({
      title: t.title ?? '',
      user: typeof t.user === 'number' ? t.user : (t.user?.id ?? 1),
      completed: t.completed ?? false,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: '', user: 1, completed: false });
  };

  const saveEdit = async () => {
    await request(`/todos/${editingId}/`, {
      method: 'PATCH',
      body: JSON.stringify(draft),
    });
    cancelEdit();
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Tarefas</h2>

      <form onSubmit={create} className="row">
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="User ID"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: Number(e.target.value) })}
        />
        <button type="submit">Criar</button>
      </form>

      <ul>
        {items.map(t => (
          <li key={t.id} className="row">
            {editingId === t.id ? (
              <>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
                <input
                  type="number"
                  value={draft.user}
                  onChange={(e) => setDraft({ ...draft, user: Number(e.target.value) })}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={draft.completed}
                    onChange={(e) => setDraft({ ...draft, completed: e.target.checked })}
                  />
                  Concluído
                </label>
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>{t.id} - {t.title}</span> — <strong>{t.completed ? 'OK' : 'NOT'}</strong>
                <button onClick={() => startEdit(t)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
