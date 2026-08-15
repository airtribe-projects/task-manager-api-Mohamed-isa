const express = require('express');

const router = express.Router();
const data = require('../task.json');
const tasks = data.tasks;

//Get All Data
router.get('/', (req, res) => {
    res.json(tasks);
});


//Get by Id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);    
    console.log(req.params,tasks);
    
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.json(task);
});

//save Task
router.post('/', (req, res) => {

    const { title, description, completed } = req.body;

    if (!title || !description || completed === undefined) {
        return res.status(400).json({
            message: 'title, description and completed are required'
        });
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: title,
        description: description,
        completed: completed
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

//Update

router.put('/:id', (req, res) => {

    const id = Number(req.params.id);

    // Find the task
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    // Get data from request body
    const { title, description, completed } = req.body;

    // Update the task
    task.title = title;
    task.description = description;
    task.completed = completed;

    // Send updated task
    res.json(task);
});


//Delete
router.delete('/:id', (req, res) => {

    const id = Number(req.params.id);

    // Find the index of the task
    const taskIndex = tasks.findIndex(task => task.id === id);

    // Check if task exists
    if (taskIndex === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    // Remove the task from the array
    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: 'Task deleted successfully',
        data: deletedTask[0]
    });
});

module.exports = router;