import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

const API = 'https://jsonplaceholder.typicode.com/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}?_limit=10`)
      .then(res => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async (title) => {
    try {
      setLoading(true);
      const res = await axios.post(API, {
        title,
        completed: false,
      });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    try {
      const res = await axios.patch(`${API}/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map(t => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = todos.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>To‑Do App</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <TodoInput onAdd={addTodo} disabled={loading} />
      {loading && <p>Loading...</p>}
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
      {!loading && filtered.length === 0 && <p>No todos found.</p>}
    </div>
  );
}
