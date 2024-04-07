// controllers/userController.js
const User = require('../models/userSchema');

// Controller function to create a user
exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if user with the same email already exists
    if (await User.findOne({ email }) || await User.findOne({ username })) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    // Create a new user
    const newUser = new User({ username, email });
    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      user: newUser 
    });

  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create user', 
      error: error.message
    });
  }
};
