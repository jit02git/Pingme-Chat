const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/connect');
const userRoutes = require('./Route/userRoute');

const app = express();

// Connect DB
connectDB();

// Middleware (ALWAYS before routes)
app.use(cors());
app.use(express.json());

// Routes   
app.use('/api/users', userRoutes);

// Servers
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});