// src/routes/location-routes.js
const express = require('express');
const router = express.Router();
const locationRepository = require('../repositories/location-repository');
const logger = require('../config/logger');

// Get all locations
router.get('/', async (req, res, next) => {
    try {
        const locations = await locationRepository.findAll();
        res.json({
            success: true,
            data: locations
        });
    } catch (error) {
        next(error);
    }
});

// Get location by ID
router.get('/:id', async (req, res, next) => {
    try {
        const location = await locationRepository.findById(req.params.id);
        if (!location) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }
        res.json({
            success: true,
            data: location
        });
    } catch (error) {
        next(error);
    }
});

// Create new location
router.post('/', async (req, res, next) => {
    try {
        const newLocation = await locationRepository.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Location created successfully',
            data: newLocation
        });
    } catch (error) {
        next(error);
    }
});

// Update location
router.put('/:id', async (req, res, next) => {
    try {
        const updatedLocation = await locationRepository.update(req.params.id, req.body);
        if (!updatedLocation) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }
        res.json({
            success: true,
            message: 'Location updated successfully',
            data: updatedLocation
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;