import Todos from './cliente.jsx';
import './styles.css';

export default function App() {
  return (
    <>
      <header>
        <h1>Projeto Final - POS</h1>
      </header>
      <nav>
        <a href="#">Usuários</a>
        <a href="#">Posts</a>
        <a href="#">Comentários</a>
        <a href="#">Tarefas</a>
        <a href="#">Álbuns</a>
        <a href="#">Fotos</a>
      </nav>
      <main>
        <Todos />
      </main>
    </>
  );
}
