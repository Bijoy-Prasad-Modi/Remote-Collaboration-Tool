const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/db');
const roomRoutes = require('./routes/RoomRoutes');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();

const app = express();

app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/users', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
