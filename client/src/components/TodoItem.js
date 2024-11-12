import React from "react";

function TodoItem({ todo, deleteTodo, editTodo }) {


  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="checkboxclass"
        checked={todo.isChecked}
      
      />
      <span
        className={`checkbox-label ${todo.isChecked ? "checked" : ""}`}
        
      >
        {todo.text}
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
