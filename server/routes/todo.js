const express = require('express');
const router = express.Router();

let todos = []; // In-memory storage for simplicity

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});




// Toggle todo status
router.put('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id == req.params.id);
  if (todo) {
    todo.isChecked = !todo.isChecked;
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// Delete a todo
router.delete('/:id', (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.sendStatus(204);
  });
  
  module.exports = router;
  
