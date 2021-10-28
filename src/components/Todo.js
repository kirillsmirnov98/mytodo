import './Todo.style.css';
import React, { useState } from 'react';

const Todo = ({ todo, toggleTask, removeTask, editTask }) => {
    const [style, setStyle] = useState({ display: 'none' });
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(todo.task);
    const taskEditing = () => {
        setEdit(!edit);
    }
    const handleChangeTask = (e) => {
        setText(e.currentTarget.value);
    }
    const handleEditTask = (e) => {
        if (e.key === 'Enter') {
            editTask(todo.id, text);
            setEdit(!edit);
        }
    }
    return (
        <div key={todo.id} className="todoitem"
            onMouseEnter={e => {
                setStyle({ display: 'block' });
            }}
            onMouseLeave={e => {
                setStyle({ display: 'none' })
            }}>
            {!edit && <input
                className="todocheckbox"
                checked={todo.complete ? true : false}
                type="checkbox"
                onChange={() => toggleTask(todo.id)}
            ></input>}
            {!edit && <label className={todo.complete ? "item-text disactive" : "item-text active"}
                onDoubleClick={taskEditing}
            >
                {todo.task}
            </label>}
            {edit &&
                <input
                    value={text}
                    type="text"
                    className="todo-edit-panel"
                    onChange={handleChangeTask}
                    onKeyDown={handleEditTask}
                    autoFocus=""
                ></input>
            }
            {!edit && <div
                style={style}
                className="todo-delete"
                onClick={() => removeTask(todo.id)}
            >
                x
            </div>}
        </div>
    )
}

export default Todo;