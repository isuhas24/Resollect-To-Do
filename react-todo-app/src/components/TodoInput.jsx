import './TodoInput.css';
import { useState } from 'react';

export default function TodoInput({ onAdd, disabled }) {
  const [text, setText] = useState('');
  const submit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };
  return (
    <div className="todo-input-container">
      <input
        className="todo-input"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo..."
        disabled={disabled}
      />
      <button className="todo-add-btn" onClick={submit} disabled={disabled}>
        Add
      </button>
    </div>
  );
}
