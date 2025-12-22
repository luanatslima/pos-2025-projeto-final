import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Fotos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', thumbnailUrl: '', album: 1 });

  const load = async () => {
    const data = await request('/photos/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/photos/', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', url: '', thumbnailUrl: '', album: 1 });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Fotos</h2>
      <form onSubmit={create} className="row">
        <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} />
        <input type="number" placeholder="Album ID" value={form.album} onChange={(e) => setForm({ ...form, album: Number(e.target.value) })} />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(f => (
          <li key={f.id}>#{f.id} {f.title} — <a href={f.url} target="_blank" rel="noreferrer">Ver Foto</a></li>
        ))}
      </ul>
    </div>
  );
}