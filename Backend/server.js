// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory task list
let tasks = [
  { id: 1, title: 'Complete Internship Test', status: 'pending', createdAt: new Date().toISOString() }
];

// Routes

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = {
    id: tasks.length + 1,
    title,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const { title, status } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (title) task.title = title;
  if (status) task.status = status;
  res.json(task);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start server
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
