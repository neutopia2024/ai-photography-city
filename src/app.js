const express = require('express');
const locationRoutes = require('./routes/location-routes'); // Note the kebab-case filename

const app = express();
app.use(express.json());
app.use('/api/v1/locations', locationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: err.message || 'Internal Server Error',
        status: 500
    });
});

module.exports = app;