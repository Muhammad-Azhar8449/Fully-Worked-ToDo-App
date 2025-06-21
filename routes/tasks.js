const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Show all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks, query: req.query });
});

// Add new task
router.post('/add', async (req, res) => {
    const { title, priority } = req.body;
    if (!title.trim()) return res.redirect('/?alert=empty');

    await Task.create({ title, priority });
    res.redirect('/?alert=added');
});

// Delete task
router.post('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/?alert=deleted');
});

// Edit task form
router.get('/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task });
});

// Update task
router.post('/edit/:id', async (req, res) => {
    const { title, priority } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, priority });
    res.redirect('/?alert=updated');
});

module.exports = router;
