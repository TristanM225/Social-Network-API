// routes/index.js
const router = require('express').Router();
const apiRoutes = require('./api'); // Import the API routes module

// Mount the API routes
router.use('/api', apiRoutes);

module.exports = router;
