const express = require("express");
const router = express.Router();
const characterRepository = require("../repositories/character-repository");
const characterValidation = require("../middleware/validation/character-validation");
const validateRequest = require("../middleware/validate-request");
const logger = require("../config/logger");

// Create a character
router.post(
  "/",
  characterValidation.create,
  validateRequest,
  async (req, res, next) => {
    try {
      const characterId = await characterRepository.create(req.body);
      logger.info(`Character created with ID: ${characterId}`);
      res.status(201).json({
        message: "Character created successfully",
        characterId,
      });
    } catch (error) {
      next(error);
    }
  },
);

// Get all characters
router.get("/", async (req, res, next) => {
  try {
    const characters = await characterRepository.findAll();
    res.json(characters);
  } catch (error) {
    next(error);
  }
});

// Get character by ID
router.get(
  "/:id",
  characterValidation.getById,
  validateRequest,
  async (req, res, next) => {
    try {
      const character = await characterRepository.findById(req.params.id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
