const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

// Route to create a new user
router.post('/users/create', userController.createUser);

module.exports = router;
