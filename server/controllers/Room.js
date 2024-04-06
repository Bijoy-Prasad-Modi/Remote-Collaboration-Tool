const Room = require('../models/roomSchema');
const TaskManageBoard = require('../models/TaskManageBoard');

exports.createRoom = async (req, res) => {
  try {
    const { roomName, userID } = req.body;

    if(!roomName || !userID) {
      return res.status(400).json({ 
        sucess: false,
        message: 'All fields are required' 
      });
    }

    // Check if room name already exists
    if (await Room.findOne({ roomName })) {
      return res.status(400).json({ 
        sucess: false,
        message: 'Room name already exists' 
      });
    }

    // Create a new room
    const room = new Room({
      name: roomName,
      admin: userID,
      code: Math.floor(1000 + Math.random() * 9000) + Date.now()
    });

    await room.save();

    // Create a new task manage board for the room
    const taskManageBoard = new TaskManageBoard({
      roomCode: room.code,
      columns: []
    });

    await taskManageBoard.save();

    res.status(201).json({ 
      message: 'Room created successfully',
      room: room
    });

  } 
  catch (error) {
    res.status(500).json({ 
      message: "Failed to create room",
      error: error.message 
    });
  }
};


// Controller function to update a room
exports.updateRoom = async (req, res) => {
  try {
    const { code, newRoomName, userId } = req.body; // Assuming you provide room ID in the request body

    if(!newRoomName || !code || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const room = await Room.findOne({ code });

    if(!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    // check if the user is the admin of the room
    if(room.admin.toString() !== userId.toString()){
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this room' 
      });
    }

    // Check if the room exists
    room.name = newRoomName;
    await room.save();

    res.status(200).json({ 
      success: true, 
      message: 'Room updated successfully',
      room: room 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update room', 
      error: error.message 
    });
  }
}

// Controller function to join a room
exports.joinRoom = async (req, res) => {
  try {
    const { code, userId } = req.body;

    // Find the room by roomCode
    const room = await Room.findOne({ code });

    // Check if the room exists
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    // check if user is present or not
    if (room.users.includes(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already joined the room' 
      });
    }

    // Add the user to participants list
    room.users.push(userId);
    await room.save();
    await room.populate('users');

    res.status(200).json({ 
      success: true, 
      message: 'Joined room successfully', 
      room: room 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to join room', 
      error: error.message 
    });
  }
}

// Controller function to leave a room
exports.leaveRoom = async (req, res) => {
  try {
    const { code, userId } = req.body;

    // Find the room by roomCode
    const room = await Room.findOne({ code });

    // Check if the room exists
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    // Check if the user is in the room
    if (!room.users.includes(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not in the room' 
      });
    }

    // Remove the user from joined users list
    room.users = room.users.filter(user => user.toString() !== userId.toString());
    await room.save();

    res.status(200).json({ 
      success: true, 
      message: 'Left room successfully', 
      room: room 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to leave room', 
      error: error.message 
    });
  }
}

// get room by entering the room id
exports.getRoomById = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId).populate('admin').populate('users').exec();

    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    res.status(200).json({
      success: true,
      room: room
    });

  }
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve room', 
      error: error.message 
    });
  }
}


// Controller function to get all rooms created by a user
exports.getRoomsCreatedByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all rooms where the user is the admin
    const rooms = await Room.find({ admin: userId }).populate('admin').exec();

    res.status(200).json({ 
      success: true,
      rooms: rooms 
    });

  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve rooms', 
      error: error.message 
    });
  }
}

// Controller function to get all rooms joined by a user
exports.getRoomsJoinedByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all rooms where the user is listed as a participant
    const rooms = await Room.find({ users: { $in: [userId] } }).populate('users').exec();

    res.status(200).json({ 
      success: true, 
      rooms: rooms
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve rooms', 
      error: error.message 
    });
  }
}





