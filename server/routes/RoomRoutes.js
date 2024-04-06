const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room');

// Route to create a new room
router.post('/rooms/create', roomController.createRoom);

// Route to update a room
router.post('/rooms/update', roomController.updateRoom);

// Route to join a room
router.post('/rooms/join', roomController.joinRoom);

// Route to leave a room
router.post('/rooms/leave', roomController.leaveRoom);

// Route to get all rooms created by a user
router.post('/rooms/getRoomsCreatedByUser', roomController.getRoomsCreatedByUser);

// Route to get all rooms joined by a user
router.post('/rooms/getRoomsJoinedByUser', roomController.getRoomsJoinedByUser);

module.exports = router;
