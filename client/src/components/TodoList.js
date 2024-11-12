import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <ul id="itemsContainer">
      {/* Pass editTodo to TodoItem */}
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
