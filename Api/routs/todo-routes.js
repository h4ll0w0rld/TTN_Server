const express = require('express');
const { createTodo, getTodos, deleteTodo, todoDone } = require('../controllers/todo-controller');
const authenticateToken = require('../middleware/jwt-middleware');

const router = express.Router();

//Routing todo requests to its controller
router.post('/todos', authenticateToken, createTodo);
router.post('/todo/done', authenticateToken, todoDone )
router.get('/todos', authenticateToken, getTodos);
router.delete('/todo', authenticateToken, deleteTodo);

module.exports = router;


