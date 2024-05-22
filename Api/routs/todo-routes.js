const express = require('express');
const { createTodo, getTodos, deleteTodo } = require('../controllers/todo-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();

router.post('/todos', authenticateToken, createTodo);
router.get('/todos', authenticateToken, getTodos);
router.delete('/todos', authenticateToken, deleteTodo);

module.exports = router;