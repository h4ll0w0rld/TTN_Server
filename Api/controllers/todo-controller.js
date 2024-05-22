const TodoService = require('../services/todo-service');

async function createTodo(req, res) {
    try {
        const { headline, description, isDone } = req.body;
        await TodoService.createTodo({ headline, description, isDone });
        res.status(201).send('New ToDo task created.');
    } catch (err) {
        console.error('Error creating ToDo task:', err);
        res.status(500).send('Error creating ToDo task.');
    }
};

async function getTodos(req, res) {
    try {
        const todos = await TodoService.getTodos();
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error fetching ToDo tasks:', err);
        res.status(500).send('Error fetching ToDo tasks.');
    }
};

async function deleteTodo(req, res) {
    try {
        const { id } = req.body;
        await TodoService.deleteTodoById(id);
        res.status(200).send('Task Deleted');
    } catch (err) {
        console.error('Error deleting ToDo task:', err);
        res.status(500).send('Error deleting ToDo task.');
    }
};

async function todoDone(req, res) {
    try {
        const { id } = req.body
        await TodoService.todoDone(id);
        res.send('Todo is marked done').status(201)
    } catch {
        console.log('Error switching todo status')
        res.send(500).send('Error switching status')
    }
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    todoDone
};