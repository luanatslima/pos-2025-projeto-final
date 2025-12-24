import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Albuns() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', user: 1 });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', user: 1 });

  const load = async () => {
    try {
      const data = await request('/albums/');
      setItems(data.results ?? data);
    } catch (err) {
      console.error('Erro ao carregar álbuns:', err);
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await request('/albums/', { method: 'POST', body: JSON.stringify(form) });
      setForm({ title: '', user: 1 });
      load();
    } catch (err) {
      console.error('Erro ao criar álbum:', err);
    }
  };

  const startEdit = (a) => {
    setEditingId(a.id);
    setDraft({
      title: a.title ?? '',
      user: typeof a.user === 'number' ? a.user : (a.user?.id ?? 1),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: '', user: 1 });
  };

  const saveEdit = async () => {
    try {
      await request(`/albums/${editingId}/`, {
        method: 'PATCH',
        body: JSON.stringify(draft),
      });
      cancelEdit();
      load();
    } catch (err) {
      console.error('Erro ao salvar álbum:', err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Álbuns</h2>

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
        {items.map(a => (
          <li key={a.id} className="row">
            {editingId === a.id ? (
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
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>#{a.id} {a.title}</span>
                <button onClick={() => startEdit(a)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
