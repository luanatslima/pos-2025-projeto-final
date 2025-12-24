import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Comentarios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', body: '', post: 1 });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: '', email: '', body: '', post: 1 });

  const load = async () => {
    try {
      const data = await request('/comments/');
      setItems(data.results ?? data);
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await request('/comments/', { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', email: '', body: '', post: 1 });
      load();
    } catch (err) {
      console.error('Erro ao criar comentário:', err);
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setDraft({
      name: c.name ?? '',
      email: c.email ?? '',
      body: c.body ?? '',
      post: typeof c.post === 'number' ? c.post : (c.post?.id ?? 1),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ name: '', email: '', body: '', post: 1 });
  };

  const saveEdit = async () => {
    try {
      await request(`/comments/${editingId}/`, {
        method: 'PATCH',
        body: JSON.stringify(draft),
      });
      cancelEdit();
      load();
    } catch (err) {
      console.error('Erro ao salvar comentário:', err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Comentários</h2>
      <form onSubmit={create} className="row">
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Comentário"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <input
          type="number"
          placeholder="Post ID"
          value={form.post}
          onChange={(e) => setForm({ ...form, post: Number(e.target.value) })}
        />
        <button type="submit">Criar</button>
      </form>

      <ul>
        {items.map(c => (
          <li key={c.id} className="row">
            {editingId === c.id ? (
              <>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
                <input
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                />
                <input
                  value={draft.body}
                  onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                />
                <input
                  type="number"
                  value={draft.post}
                  onChange={(e) => setDraft({ ...draft, post: Number(e.target.value) })}
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>#{c.id} {c.name} — {c.body}</span>
                <button onClick={() => startEdit(c)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
