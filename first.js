// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do'	}];

// Task Model
class Task {
    constructor(id, title, description, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

// Routes

// Create Task
app.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ error: 'Title and status are required' });
    }

    const id = tasks.length + 1;
    const newTask = new Task(id, title, description || '', status);
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read All Tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update Task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;

    let taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task not found' });
    }

    taskToUpdate.title = title || taskToUpdate.title;
    taskToUpdate.description = description || taskToUpdate.description;
    taskToUpdate.status = status || taskToUpdate.status;

    res.json(taskToUpdate);
});

// Delete Task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
