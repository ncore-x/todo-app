import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get('/todos/');
        setTodos(res.data);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await axios.post('/todos/', { title });
        setTitle('');
        fetchTodos();
    };

    const toggleTodo = async (id, completed) => {
        await axios.patch(`/todos/${id}`, { completed: !completed });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`/todos/${id}`);
        fetchTodos();
    };

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
            <h1>Todo List</h1>
            <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="New todo..."
                    style={{ flex: 1, padding: 8 }}
                />
                <button type="submit">Add</button>
            </form>
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
    );
}

export default App;
