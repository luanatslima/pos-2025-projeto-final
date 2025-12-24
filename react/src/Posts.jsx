import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Posts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', body: '', user: 1 });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', body: '', user: 1 });

  const load = async () => {
    const data = await request('/posts/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/posts/', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', body: '', user: 1 });
    load();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setDraft({ title: p.title, body: p.body, user: p.user });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ title: '', body: '', user: 1 });
  };

  const saveEdit = async () => {
    await request(`/posts/${editingId}/`, { method: 'PATCH', body: JSON.stringify(draft) });
    cancelEdit();
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Posts</h2>
      <form onSubmit={create} className="row">
        <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Conteúdo" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <input type="number" placeholder="User ID" value={form.user} onChange={(e) => setForm({ ...form, user: Number(e.target.value) })} />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(p => (
          <li key={p.id} className="row">
            {editingId === p.id ? (
              <>
                <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <input value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
                <input type="number" value={draft.user} onChange={(e) => setDraft({ ...draft, user: Number(e.target.value) })} />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>#{p.id} {p.title} — {p.body}</span>
                <button onClick={() => startEdit(p)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
