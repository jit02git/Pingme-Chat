const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/connect');
const userController = require('./Controllers/UserController');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/register', userController.register);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});