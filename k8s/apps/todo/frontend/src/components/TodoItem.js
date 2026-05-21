import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id, todo.completed)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}>
                {todo.title}
            </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
