import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Albuns() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', user: 1 });

  const load = async () => {
    const data = await request('/albums/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/albums/', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', user: 1 });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Álbuns</h2>
      <form onSubmit={create} className="row">
        <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="number" placeholder="User ID" value={form.user} onChange={(e) => setForm({ ...form, user: Number(e.target.value) })} />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(a => (
          <li key={a.id}>#{a.id} {a.title}</li>
        ))}
      </ul>
    </div>
  );
}
