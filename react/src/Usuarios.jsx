import { useEffect, useState } from 'react';
import { request } from './api';
import './styles.css';

export default function Usuarios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', username: '', email: '' });

  const load = async () => {
    const data = await request('/users/');
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await request('/users/', { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', username: '', email: '' });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Usuários</h2>
      <form onSubmit={create} className="row">
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(u => (
          <li key={u.id}>
            #{u.id} {u.name} ({u.username}) — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
