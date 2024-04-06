const express = require('express');
const router = express.Router();

const { createNewColumn, deleteColumn, updateColumn, getAllColumns } = require('../controllers/Column');
const { createNewTask, deleteTask, updateTask, getAllTasks } = require('../controllers/Tasks');
 
router.post('/createNewColumn', createNewColumn);
router.post('/createNewTask', createNewTask);
router.post('/getAllColumns', getAllColumns);
router.post('/getAllTasks', getAllTasks);
router.post('/updateColumn', updateColumn);
router.post('/updateTask', updateTask);
router.post('/deleteColumn', deleteColumn);
router.post('/deleteTask', deleteTask);

module.exports = router;