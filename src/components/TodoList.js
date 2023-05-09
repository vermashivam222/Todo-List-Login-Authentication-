import React, { useState } from 'react';

const TodoList = ({ todos, setTodos, setEditTodo }) => {
    const [addTodo, setAddTodo] = useState(null);

    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            })
        );
    };

    const handleEdit = ({ id }) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    };

    const handleAddNested = (id) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setAddTodo({ id: findTodo.id, title: '', completed: false });
    };

    const handleAddNestedChange = (event) => {
        setAddTodo({ ...addTodo, title: event.target.value });
    };

    const handleAddNestedSave = () => {
        if (addTodo && addTodo.title.trim() !== '') {
            const index = todos.findIndex((item) => item.id === addTodo.id);
            setTodos([
                ...todos.slice(0, index + 1),
                { ...addTodo, id: Date.now() },
                ...todos.slice(index + 1)
            ]);
            setAddTodo(null);
        }
    };

    const handleAddNestedCancel = () => {
        setAddTodo(null);
    };

    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input
                        type="text"
                        value={todo.title}
                        className={`list ${todo.completed ? 'complete' : ''}`}
                        onChange={(event) => event.preventDefault()}
                    />
                    <div>
                        <button
                            className="button-complete task-button"
                            onClick={() => handleComplete(todo)}
                        >
                            <i className="fa fa-check-circle"></i>
                        </button>
                        <button
                            className="button-edit task-button"
                            onClick={() => handleEdit(todo)}
                        >
                            <i className="fa fa-edit"></i>
                        </button>
                        <button
                            className="button-delete task-button"
                            onClick={() => handleDelete(todo)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                        {addTodo && addTodo.id === todo.id ? (
                            <div>
                                <input
                                    className={`list ${addTodo.completed ? 'complete' : ''}`}
                                    type="text"
                                    placeholder="Enter new todo"
                                    value={addTodo.title}
                                    onChange={handleAddNestedChange}
                                />
                                <button className="button-complete task-button" onClick={handleAddNestedSave}>
                                    <i className="fa fa-check-circle"></i>
                                    </button>

                                <button onClick={handleAddNestedCancel}>Cancel</button>
                            </div>
                        ) : (
                            <button
                                className="button-sub task-button"
                                onClick={() => handleAddNested(todo.id)}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </div>
    );
};

export default TodoList;
