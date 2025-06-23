const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks, query: req.query });
});

router.post('/add', async (req, res) => {
    const { title, priority } = req.body;
    if (!title.trim()) return res.redirect('/?alert=empty');

    await Task.create({ title, priority });
    res.redirect('/?alert=added');
});

router.delete('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/?alert=deleted');
});

router.get('/edit/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task });
});

router.put('/edit/:id', async (req, res) => {
    const { title, priority } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, priority });
    res.redirect('/?alert=updated');
});

module.exports = router;
