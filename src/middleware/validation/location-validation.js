// src/middleware/validation/location-validation.js
const { body } = require("express-validator");

const locationValidation = {
    create: [
        body("name").notEmpty().trim().withMessage("Name is required"),
        body("district_type")
            .notEmpty()
            .trim()
            .withMessage("District type is required"),
        body("coordinates")
            .isObject()
            .withMessage("Coordinates must be an object"),
        body("coordinates.x")
            .isNumeric()
            .withMessage("X coordinate must be a number"),
        body("coordinates.y")
            .isNumeric()
            .withMessage("Y coordinate must be a number"),
        body("coordinates.elevation")
            .isNumeric()
            .withMessage("Elevation must be a number"),
        body("current_state")
            .isObject()
            .withMessage("Current state must be an object"),
    ],
};

module.exports = locationValidation;
