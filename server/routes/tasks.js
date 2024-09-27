const express = require('express');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware');
const Tasks = require('../models/Tasks');

const router = express.Router();

// Get all tasks for the authenticated user
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const tasks = await Tasks.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.send({ error: 'Failed to fetch tasks' });
    }
});

// Create a new task
router.post('/add', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    try {
        const isExistTask = await Tasks.findOne({ attributes: ['id'], where: { title }, raw: true });
        if (isExistTask) res.send({ error: 'Task already exists' });

        const task = await Tasks.create({ title, description, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.send({ error: 'Failed to create task' });
    }
});

// Update an existing task
router.post('/update/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    try {

        const task = await Tasks.findOne({
            attributes: ['id'],
            where: { id: Number(id), userId: req.user.id },
            raw: true
        });

        if (!task) return res.status(404).json({ error: 'Task not found' });

        const isExistTask = await Tasks.findOne({
            attributes: ['id'],
            where: { title, id: { [Op.ne]: Number(id) } },
            raw: true
        });

        if (isExistTask) res.send({ error: 'Task already exists' });

        await Tasks.update({
            title: title || task.title,
            description: description || task.description,
            isCompleted: isCompleted != null ? isCompleted : task.isCompleted,
        }, {
            where: { id },
        });

        res.status(200).json(task);

    } catch (error) {
        res.send({ error: 'Failed to update task' });
    }
});

// Delete a task
router.post('/delete/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Tasks.findOne({ attributes: ['id'], where: { id, userId: req.user.id }, raw: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        await Tasks.destroy({ where: { id } });

        res.status(204).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.send({ error: 'Failed to delete task' });
    }
});

module.exports = router;
