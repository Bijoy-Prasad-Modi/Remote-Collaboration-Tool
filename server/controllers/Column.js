const TaskManageBoard = require('../models/TaskManageBoard');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');

exports.createNewColumn = async (req, res) => {
    try {
        const { id, title, roomCode } = req.body;

        if (!id || !title || !roomCode) {
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        if(await Columns.findOne({id: id})){
            return res.status(404).json({
                success: false,
                message: "Column already exists"
            });
        }

        const newColumn = new Columns({
            id: id,
            title: title,
            roomCode: roomCode
        });

        await newColumn.save();

        const taskManageBoard = await TaskManageBoard.findOne({ roomCode });

        if(!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found`
            });
        }

        taskManageBoard.columns.push(newColumn._id);
        await taskManageBoard.save();

        return res.status(200).json({
            success: true,
            message: `Column created successfully`,
            data: newColumn
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't create new column",
            error: error.message
        });
    }
}

exports.deleteColumn = async (req, res) => {

    try {

        const {id, roomCode} = req.body;

        if(!id || !roomCode){
            return res.status(400).json({
                success: false,
                message: "Please provide all details"
            });
        }

        const column = await Columns.findOne({id: id});

        if(!column){
            return res.status(400).json({
                success: false,
                message: "Column not found"
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({ roomCode });

        if(!taskManageBoard){
            return res.status(400).json({
                success: false,
                message: "Task Manage Board not found"
            });
        }

        for(let i = 0; i < column.tasks.length; i++){
            await Tasks.findByIdAndDelete(column.tasks[i]);
        }

        taskManageBoard.columns.pull(column._id);
        taskManageBoard.save();

        await Columns.findByIdAndDelete(column._id);

        return res.status(200).json({
            success: true,
            message: `Column "${column.title}" deleted successfully`
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting column",
            error: error.message
        })
    }
}

exports.getAllColumns = async (req, res) => {

    try {
        const { roomCode } = req.body;

        if (!roomCode) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find roomCode"
            });
        }

        const taskManageBoard = await TaskManageBoard.findOne({ roomCode }).populate('columns');

        if (!taskManageBoard) {
            return res.status(404).json({
                success: false,
                message: `No task manage board found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Fetched all the Columns successfully for the organisation ${organisation}`,
            data: taskManageBoard.columns
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching all the columns",
            error: error.message
        });
    }
}

exports.updateColumn = async (req, res) => {

    try {

        const { id, title } = req.body;

        if(!id || !title){
            return res.status(400).json({
                success: false,
                message: "Please include all the required fields"
            });
        }

        const column = await Columns.findOne({id: id});

        if(!column){
            return res.status(400).json({
                success: false,
                message: "Column not found"
            });
        }

        if(title) {
            column.title = title;
        }

        await column.save();

        return res.status(200).json({
            success: true,
            message: "Column updated successfully",
            data: column
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't update column",
            error: error.message
        })
    }
}