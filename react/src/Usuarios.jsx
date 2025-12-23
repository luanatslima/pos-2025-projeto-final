import { useEffect, useState } from 'react';
import { users } from './api'; 
import './styles.css';

export default function Usuarios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', name: '' });

  const load = async () => {
    try {
      const data = await users.list();
      setItems(data.results ?? data);
    } catch (err) {
      alert(`Erro ao carregar usuários: ${err.message}`);
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await users.create(form);
      setForm({ username: '', email: '', name: '' });
      load();
    } catch (err) {
      alert(`Erro ao criar usuário: ${err.message}`);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Usuários</h2>
      <form onSubmit={create} className="row">
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
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {items.map(u => (
          <li key={u.id}>
            #{u.id} {u.username} — {u.email} {u.name && `(${u.name})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
