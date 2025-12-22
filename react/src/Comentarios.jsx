import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Comentarios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', body: '', post: 1 });

  const load = async () => {
    const data = await request('/comments/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/comments/', { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', email: '', body: '', post: 1 });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Comentários</h2>
      <form onSubmit={create} className="row">
        <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Comentário" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <input type="number" placeholder="Post ID" value={form.post} onChange={(e) => setForm({ ...form, post: Number(e.target.value) })} />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(c => (
          <li key={c.id}>#{c.id} {c.name} — {c.body}</li>
        ))}
      </ul>
    </div>
  );
}


