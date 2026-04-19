const express = require('express');
const connectDB = require('./Config/connect');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})