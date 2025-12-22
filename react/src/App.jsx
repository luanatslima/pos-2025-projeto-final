import { useState } from 'react';
import Todos from './cliente.jsx';
import Usuarios from './Usuarios.jsx';
import Posts from './Posts.jsx';
import Comentarios from './Comentarios.jsx';
import Albuns from './Albuns.jsx';
import Fotos from './Fotos.jsx';
import './styles.css';

export default function App() {
  const [page, setPage] = useState('todos');

  return (
    <>
      <header>
        <h1>Projeto Final - POS</h1>
      </header>
      <nav>
        <a onClick={() => setPage('usuarios')}>Usuários</a>
        <a onClick={() => setPage('posts')}>Posts</a>
        <a onClick={() => setPage('comentarios')}>Comentários</a>
        <a onClick={() => setPage('todos')}>Tarefas</a>
        <a onClick={() => setPage('albuns')}>Álbuns</a>
        <a onClick={() => setPage('fotos')}>Fotos</a>
      </nav>
      <main>
        {page === 'usuarios' && <Usuarios />}
        {page === 'posts' && <Posts />}
        {page === 'comentarios' && <Comentarios />}
        {page === 'todos' && <Todos />}
        {page === 'albuns' && <Albuns />}
        {page === 'fotos' && <Fotos />}
      </main>
    </>
  );
}
