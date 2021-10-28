import './Main.style.css';
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import TodoFilter from './TodoFilter';

const Main = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("filter", filter)
  }, [filter]);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: new Date().getTime(),
        task: userInput,
        complete: false,
      }
      setTodos([...todos, newItem]);
    }
  }

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleToggle = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
    ))
  }

  const selectAllTasks = (tasksSelect) => {
    setTodos(todos.map((todo) =>
      !tasksSelect ? { ...todo, complete: true } : { ...todo, complete: false }
    ))
  }

  const deleteCompletedTasks = () => {
    setTodos(todos.filter((todo) =>
      (todo.complete) ? removeTask(todo.id) : { ...todo }
    ))
  }

  const editTask = (id, newValue) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, task: newValue} : {...todo}));
  }

  let completedItemsCount = 0;
  let activeItemsCount = 0;
  todos.forEach((item) => {
    if (item.complete) {
      completedItemsCount++;
    } else {
      activeItemsCount++;
    }
  });

  const filteredTodo = (name) => {
    setFilter(name);
  }

  return (
    <div className="main">
      <TodoForm
        addTask={addTask}
        length={todos.length}
        selectAllTasks={selectAllTasks}
      >
      </TodoForm>
      {filter === 'all' && todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todos.id}
            editTask={editTask}
            toggleTask={handleToggle}
            removeTask={removeTask}
          />
        )
      })}
      {filter === 'completed' && todos.map((todo) => {
        if (todo.complete === true)
          return (
            <Todo
              todo={todo}
              key={todos.id}
              editTask={editTask}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          )
      })}
      {filter === 'active' && todos.map((todo) => {
        if (todo.complete === false)
          return (
            <Todo
              todo={todo}
              key={todos.id}
              editTask={editTask}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          )
      })}
      {todos.length > 0 && (
        <TodoFilter
          length={activeItemsCount}
          deleteCompletedTasks={deleteCompletedTasks}
          currentValue={completedItemsCount}
          selectFilter={filteredTodo}
        />
      )}
    </div>
  )
}

export default Main;