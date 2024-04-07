const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
// const Board = require('../models/Board');

exports.createNewTask = async (req, res) => {

    try {
        const { id, content, columnId } = req.body;

        if (!id || !content || !columnId) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        if(await Tasks.findOne({id: id})){
            return res.status(404).json({
                success: false,
                message: "Task already exists"
            });
        }

        const newTask = new Tasks({
            id: id,
            columnId: columnId,
            content: content,
        });

        const column = await Columns.findOne({ id: columnId });

        if(!column) {
            return res.status(404).json({
                success: false,
                message: `Column not found`
            });
        }

        column.tasks.push(newTask._id);

        await newTask.save();
        await column.save();

        return res.status(200).json({
            success: true,
            message: `Task inside column "${columnId}" created successfully`,
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new task",
            error: error.message
        });
    }
}

exports.deleteTask = async (req, res) => {

    try {

        const { id, columnId } = req.body;

        if (!id || !columnId) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const task = await Tasks.findOne({ id: id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: `Task not found`
            });
        }

        const column = await Columns.findOne({ id: columnId });

        if (!column) {
            return res.status(404).json({
                success: false,
                message: `Column not found`
            });
        }

        column.tasks.pull(task._id);

        await column.save();

        await Tasks.findByIdAndDelete(task._id);

        return res.status(200).json({
            success: true,
            message: `Task deleted successfully`
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't delete task",
            error: error.message
        })
    }
}

exports.updateTask = async (req, res) => {

    try {

        const { id, content } = req.body;

        if(!id || !content){
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const task = await Tasks.findOne({ id: id });

        if(!task){
            return res.status(400).json({
                success: false,
                message: "Task not found"
            });
        }

        task.content = content;
        await task.save();
        
        return res.status(200).json({
            success: true,
            message: "Task updated"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't update task",
            error: error.message
        })
    }
}

exports.getAllTasks = async (req, res) => {

    try {
        const { columnId } = req.body;

        if(!columnId) {
            return res.status(400).json({
                success: false,
                message: "Please include the required fields"
            });
        }

        const column = await Columns.findOne({ id: columnId }).populate({
            path: 'tasks',
            model: 'Tasks'
        }).exec();

        if(!column) {
            return res.status(404).json({
                success: false,
                message: `Column not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Fetched all the tasks successfully for the organisation ${organisation}`,
            data: column.tasks
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching all the tasks",
            errorMessage: error.message
        });
    }
}