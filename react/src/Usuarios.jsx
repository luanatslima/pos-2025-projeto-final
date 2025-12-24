import { useEffect, useState } from 'react';
import { users } from './api';
import './styles.css';

export default function Usuarios() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', first_name: '' });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ username: '', email: '', first_name: '' });

  const load = async () => {
    const data = await users.list();
    setItems(data.results ?? data);
  };

  const create = async (e) => {
    e.preventDefault();
    await users.create(form);
    setForm({ username: '', email: '', first_name: '' });
    load();
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setDraft({ username: u.username, email: u.email, first_name: u.first_name ?? '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ username: '', email: '', first_name: '' });
  };

  const saveEdit = async () => {
    await users.patch(editingId, draft);
    cancelEdit();
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <h2>Usuários</h2>
      {/* Formulário de criação */}
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
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <button type="submit">Criar</button>
      </form>

      {/* Lista com edição */}
      <ul>
        {items.map(u => (
          <li key={u.id} className="row">
            {editingId === u.id ? (
              <>
                <input
                  value={draft.username}
                  onChange={(e) => setDraft({ ...draft, username: e.target.value })}
                />
                <input
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                />
                <input
                  value={draft.first_name}
                  onChange={(e) => setDraft({ ...draft, first_name: e.target.value })}
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEdit} className="ghost">Cancelar</button>
              </>
            ) : (
              <>
                <span>#{u.id} {u.username} — {u.email} {u.first_name && `(${u.first_name})`}</span>
                <button onClick={() => startEdit(u)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
