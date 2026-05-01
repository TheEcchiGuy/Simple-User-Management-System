const express = require('express');
const cors = require('cors');
const PORT = 3000;
const db = require('./db'); // Import the database connection
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', userRoutes);

// Routes
app.get(`/`, (req, res) => {
  res.send("Backend is running successfully!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});