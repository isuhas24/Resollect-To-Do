import './TodoItem.css';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const toggleText = todo.completed ? 'Mark as Incomplete' : 'Mark as Complete';

  return (
    <div className="todo-item">
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>✕</button>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <span className={`status-badge ${todo.completed ? 'completed' : 'not-completed'}`}>
          {todo.completed ? '✅ Completed' : '❌ Not Completed'}
        </span>
      </div>

      <button className="toggle-btn" onClick={() => onToggle(todo.id)}>
        {toggleText}
      </button>
    </div>
  );
}
