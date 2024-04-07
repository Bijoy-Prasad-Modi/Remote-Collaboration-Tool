const User = require('../models/userSchema');
const OTP = require('../models/otpSchema');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// send OTP Logic:
// 1. Fetch Email from req body
// 2. Check if already user exists in DataBase
// 3. If not, then generate OTP 
// 4. Check if it's unique OTP or not
// 5. If unique, then save it in OTP collection with the corresponding email
// 6. Return success message

// send OTP
exports.sendOTP = async (req, res) => {

    try {
        // fetch email from req body
        const { email } = req.body;

        // check if user's email already exists in DataBase and send response
        if (await User.findOne({ email })) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // generate OTP (6 digit number otp)
        var otp = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            alphabets: false
        });

        // create an entry in OTP collection
        await OTP.create({
            email: email,
            otp: otp
        });

        // return success message
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred in sendOTP controller",
            error: error.message
        });
    }
}

// sign up Logic:
// 1. Fetch FirstName, LastName, Email, Password etc data from req body
// 2. Validate the data (check if all fields are present or not)
// 3. Check if the user already exists in the DataBase
// 4. Find most recent OTP for the corresponding email 
// 5. Check if the OTP is valid or not (incorrect otp or expired otp)
// 6. If valid, then hash the password
// 7. Save the user in the DataBase

// sign up
exports.signUp = async (req, res) => {

    try {
        // fetch data from req body
        const { username, email, password, otp } = req.body;

        // Validate the data (check if all fields are present or not)
        if (!username || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if the user already exists in the DataBase
        if (await User.findOne({ email })) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Find most recent OTP for the corresponding email
        const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log(`OTP sent in request for the user ${email} is: ${otp} and recent otp in database is: ${recentOTP?.otp}`);

        // Check if the OTP is valid or not (incorrect otp or expired otp)
        if (!recentOTP || recentOTP.otp !== otp) {
            return res.status(403).json({
                success: false,
                message: "Incorrect OTP"
            });
        }

        // If valid, then hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in the DataBase
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while registering user",
            error: error.message
        });
    }
}

// Log in (sign in) Logic:
// 1. Fetch Email, Password from req body
// 2. Validate the data (check if all fields are present or not)
// 3. Check if the user already exists exists or not
// 4. Generate JWT token after matching the password (if user provided correct password)
// 5. Create cookie and send response

// Log in 
exports.login = async (req, res) => {

    try {
        // fetch data from req body
        const { email, password } = req.body;

        // Validate the data (check if all fields are present or not)
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if the user already exists in the DataBase
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User isn't registered, please sign up"
            });
        }

        // Generate JWT token after matching the password (if user provided correct password)
        if (await bcrypt.compare(password, user.password)) {

            // required options for JWT token
            const payload = {
                id: user._id,
                email: user.email,
                accountType: user.accountType,
            }

            // generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h' // token will be expired after 2 hours
            });

            user.token = token; // add token to user object 
            user.password = undefined; // remove password from user object as we will return user object in response

            // create cookie and send response
            res.cookie('token', token, {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // cookie will be removed after 2 hours
                httpOnly: true
            }).status(200).json({
                success: true,
                message: "User logged in successfully",
                token: token,
                user: user
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Login failure, please try again later",
            error: error.message
        });
    }
}

// Change Password Logic:
// 1. Fetch Old Password, New password, Confirm Password from request body
// 2. Validate Password (check if all fields are present or not)
// 3. Check if New Password and Confirm Password matches
// 4. Update password in DataBase (hash the password)
// 5. Send Mail of password updation
// 6. Return response

// Change Password

exports.changePassword = async (req, res) => {

    try {
        // fetch data from req body
        const { oldPassword, newPassword } = req.body;

        // Validate Password (check if all fields are present or not)
        if (!oldPassword || !newPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in DataBase
        const user = await User.findOneAndUpdate({ oldPassword }, { password: hashedPassword }, { new: true }); // find user by old password and update password with new password
        // if I would haven't used { new: true } then it would have returned the old document

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while chnaging password",
            error: error.message
        });
    }
}

// Get User By ID
exports.getUserById = async (req, res) => {
    try {
        // Fetch user ID from request parameters
        const {userId} = req.body;

        // Fetch user from the database by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return the user
        return res.status(200).json({
            success: true,
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching user",
            error: error.message
        });
    }
}
