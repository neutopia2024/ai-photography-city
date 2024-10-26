const { body, param } = require("express-validator");

const characterValidation = {
  create: [
    body("name").notEmpty().trim().withMessage("Name is required"),
    body("visual_features")
      .isObject()
      .withMessage("Visual features must be an object"),
    body("current_location")
      .optional()
      .isString()
      .trim()
      .withMessage("Current location must be a string"),
  ],

  getById: [param("id").isInt().withMessage("Invalid character ID")],
};

module.exports = characterValidation;
