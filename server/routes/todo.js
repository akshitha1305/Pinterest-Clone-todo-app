const express = require('express');
const router = express.Router();

let todos = []; // In-memory storage for simplicity

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});


// Delete a todo
router.delete('/:id', (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.sendStatus(204);
  });
  
  module.exports = router;
  