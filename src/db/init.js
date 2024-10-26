// src/db/init.js
const database = require('../config/database');
const logger = require('../config/logger');

const initializeTables = async () => {
    // Character table
    const characterTable = `
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            visual_features TEXT NOT NULL,
            current_location TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Location table
    const locationTable = `
        CREATE TABLE IF NOT EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            district_type TEXT NOT NULL,
            coordinates TEXT NOT NULL,
            current_state TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await database.run(characterTable);
        await database.run(locationTable);

        // Create indices
        await database.run('CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name)');
        await database.run('CREATE INDEX IF NOT EXISTS idx_locations_name ON locations(name)');

        logger.info('Database tables initialized successfully');
    } catch (error) {
        logger.error('Error initializing database tables:', error);
        throw error;
    }
};

const initializeDatabase = async () => {
    try {
        await initializeTables();
        logger.info('Database initialized successfully');
    } catch (error) {
        logger.error('Database initialization failed:', error);
        throw error;
    }
};

module.exports = {
    initializeDatabase
};
