const mongoose = require('mongoose');

const TaskManageBoardSchema = new mongoose.Schema({
    roomCode: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Columns'
    }]
});

module.exports = mongoose.model('TaskManageBoard', TaskManageBoardSchema);