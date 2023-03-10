import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [Todo, setTodo] = useState('');
  const [isCrossedOut, setIsCrossedOut] = useState([]);

  useEffect(() => {
    console.log(isCrossedOut);
  }, [isCrossedOut]);

  //when submiting the input bar will reset back to nothing
  const handleSubmit = (i) => {
    i.preventDefault();
    if (Todo.trim() === '') {
      return;
    }
    setTodos([...todos, Todo]);
    setIsCrossedOut([...isCrossedOut, false]);
    setTodo('');
  };

  const handleChange = (i) => {
    setTodo(i.target.value);
  };

  const handleToggle = (index) => {
    setIsCrossedOut((prevIsCrossedOut) =>
      prevIsCrossedOut.map((crossedOut, i) => (i === index ? !crossedOut : crossedOut))
    );
  };

  const handleDelete = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
    setIsCrossedOut([...isCrossedOut.slice(0, index), ...isCrossedOut.slice(index + 1)]);
  };

  return (
    <div className="container">
      <div className="subcontainer">
        <h1 className="header">What to do today?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={Todo}
            onChange={handleChange}
            placeholder="Add what you want to do..."
            className="input"
          />
          <button className="todo-btn">Add</button>
        </form>
        <ul className="list">
          {todos.map((todo, index) => (
            <li key={index} className={`text ${isCrossedOut[index] ? 'crossed-out' : 'item'}`}>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isCrossedOut[index]}
                  onChange={() => handleToggle(index)}
                />
                <span>
                  {todo}
                </span>
              </label>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
