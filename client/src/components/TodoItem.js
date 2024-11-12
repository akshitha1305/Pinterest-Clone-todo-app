import React from "react";

function TodoItem({ todo, deleteTodo, editTodo }) {
  const priority = todo.priority || "low"; 

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="checkboxclass"
        checked={todo.isChecked}
        onChange={() => toggleTodo(todo.id)}
      
      />
      <span
        className={`checkbox-label ${todo.isChecked ? "checked" : ""}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <span
        className={`priority-${priority}`}
        style={{ marginLeft: "10px", fontWeight: "bold" }}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
   
      <i
        className="fas fa-edit edit-icon icon-tooltip"
        data-tooltip="Edit Task"
        onClick={() => editTodo(todo.id)}
      ></i>
      <i
        className="fas fa-trash-alt delete-icon icon-tooltip"
        data-tooltip="Delete Task"
        onClick={() => deleteTodo(todo.id)}
      ></i>
    </li>
  );
}

export default TodoItem;
