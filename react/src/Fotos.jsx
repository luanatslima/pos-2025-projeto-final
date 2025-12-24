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
          <li key={f.id} className="row">
            {editingId === f.id ? (
              <>
                <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
                <input value={draft.thumbnailUrl} onChange={(e) => setDraft({ ...draft, thumbnailUrl: e.target.value })} />
                <input type="number" value={draft.album} onChange={(e) => setDraft({ ...draft, album: Number(e.target.value) })} />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>#{f.id} {f.title}</span> — <a href={f.url} target="_blank" rel="noreferrer">Ver Foto</a>
                <button onClick={() => startEdit(f)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


