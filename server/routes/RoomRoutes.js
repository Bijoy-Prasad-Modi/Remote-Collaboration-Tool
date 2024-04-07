const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room');

// Route to create a new room
router.post('/create', roomController.createRoom);

// Route to update a room
router.post('/update', roomController.updateRoom);

// Route to join a room
router.post('/join', roomController.joinRoom);

// Route to leave a room
router.post('/leave', roomController.leaveRoom);

// Route to get a room
router.post('/get', roomController.getRoomById);

// Route to get all rooms created by a user
router.post('/getRoomsCreatedByUser', roomController.getRoomsCreatedByUser);

// Route to get all rooms joined by a user
router.post('/getRoomsJoinedByUser', roomController.getRoomsJoinedByUser);

module.exports = router;
