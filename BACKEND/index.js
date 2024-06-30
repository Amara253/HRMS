const express = require('express');
const cors = require('cors');
const CookieParser = require("cookie-parser");
const routes = require('./routes/Routes'); // Adjust if needed
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const connectDB = require('./database');
const http = require('http');
const socketInit = require('./socket'); // Import the socket.js module

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
socketInit.init(server);

// Middleware setup
app.use(CookieParser("/"));
app.use(cors({
    origin: 'http://localhost:3000', // Ensure this matches your frontend's URL
    credentials: true,  // To include credentials like cookies in the requests
}));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api', routes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
