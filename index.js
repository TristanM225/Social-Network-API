// social-network-api/index.js

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(routes);

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
