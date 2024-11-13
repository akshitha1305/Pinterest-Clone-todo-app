import React, { useState, useEffect } from "react";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TodoList from "../components/TodoList";

const doraemonQuotes = [
  "Productivity is never an accident.",
  "Stay focused and positive!",
  "Believe in yourself!",
  "One step at a time!",
  "Make every day count!"
];

const kookieQuotes = [
  "Keep going!",
  "Small progress is still progress.",
  "You got this!",
  "Stay committed!",
  "Dream big, work hard!"
];

const tipOfTheDay = "Tip of the Day: Remember to prioritize your tasks!";

function TodoPage(){
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("low");
  const [doraemonQuote, setDoraemonQuote] = useState("");
  const [kookieQuote, setKookieQuote] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    setDoraemonQuote(doraemonQuotes[Math.floor(Math.random() * doraemonQuotes.length)]);
    setKookieQuote(kookieQuotes[Math.floor(Math.random() * kookieQuotes.length)]);
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
      priority: priority,
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





  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
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
       <select
          className="priority-select"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
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


        </button>
        <button className="button-element" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      <div className="doraemon-container">
        <div className="doraemon-quote">{doraemonQuote}</div>
        <img
          src="https://media.tenor.com/JDEshkdTv5oAAAAM/tata-dance.gif"
          alt="Doraemon"
          className="doraemon-gif"
        />
      </div>   
            
      <div className="kookie-container">
        <div className="kookie-quote">{kookieQuote}</div>
        <img
          src="https://i.pinimg.com/originals/8a/33/9d/8a339d01dab3b0b8ac0f900314c31232.gif"
          alt="Kookie"
          className="kookie-gif"
        />
      </div>
      
      
      





            
    </div>
  );
}

export default TodoPage;
