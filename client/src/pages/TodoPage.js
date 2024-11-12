import React, { useState, useEffect } from "react";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TodoList from "../components/TodoList";

function TodoPage(){
    const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

      }, []);

  const addTodo = () => {
    if (!inputValue.trim()) {
      alert("Enter a valid task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      isChecked: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const newText = prompt("Edit your task:");
    if (newText) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    }
  };

  const saveTodos = () => {
    localStorage.setItem("todoList", JSON.stringify(todos));
    alert("Tasks saved!");
  };

  return (
    <div className="bg-container">
      <h1 className="todos-heading">Todo Hub</h1>

      <div className="container-fluid">
        <h1 className="create-heading">
          Create <span className="span-element">Task</span>
        </h1>
        <input
          type="text"
          className="input-text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
       

        <button className="button-element" onClick={addTodo}>
          Add
        </button>

        <h1 className="create-heading">
          My <span className="span-element">Tasks</span>
        </h1>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />

        <button className="button-element" onClick={saveTodos}>
          Save
        </button>
    
      </div>


    </div>
  );
}

export default TodoPage;
