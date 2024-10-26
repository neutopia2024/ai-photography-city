// src/repositories/location-repository.js
const database = require('../config/database');
const logger = require('../config/logger');

class LocationRepository {
    async findAll() {
        const sql = `
            SELECT id, name, district_type, 
                   coordinates, current_state, 
                   created_at, updated_at
            FROM locations
            ORDER BY name ASC
        `;
        try {
            const locations = await database.all(sql);
            return locations.map(location => ({
                id: location.id,
                name: location.name,
                district_type: location.district_type,
                coordinates: JSON.parse(location.coordinates),
                current_state: JSON.parse(location.current_state),
                created_at: location.created_at,
                updated_at: location.updated_at
            }));
        } catch (error) {
            logger.error('Error finding locations:', error);
            throw error;
        }
    }

    async findById(id) {
        const sql = `
            SELECT id, name, district_type, 
                   coordinates, current_state, 
                   created_at, updated_at
            FROM locations
            WHERE id = ?
        `;
        try {
            const location = await database.get(sql, [id]);
            if (!location) return null;

            return {
                id: location.id,
                name: location.name,
                district_type: location.district_type,
                coordinates: JSON.parse(location.coordinates),
                current_state: JSON.parse(location.current_state),
                created_at: location.created_at,
                updated_at: location.updated_at
            };
        } catch (error) {
            logger.error('Error finding location by id:', error);
            throw error;
        }
    }

    async create(location) {
        const sql = `
            INSERT INTO locations (
                name, district_type, coordinates, 
                current_state
            ) VALUES (?, ?, ?, ?)
        `;
        try {
            const result = await database.run(sql, [
                location.name,
                location.district_type,
                JSON.stringify(location.coordinates),
                JSON.stringify(location.current_state)
            ]);

            // Fetch and return the newly created location
            const newLocation = await this.findById(result.id);
            logger.info('Location created successfully:', location.name);
            return newLocation;
        } catch (error) {
            logger.error('Error creating location:', error);
            throw error;
        }
    }

    async update(id, location) {
        const sql = `
            UPDATE locations 
            SET name = ?, 
                district_type = ?, 
                coordinates = ?, 
                current_state = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        try {
            const result = await database.run(sql, [
                location.name,
                location.district_type,
                JSON.stringify(location.coordinates),
                JSON.stringify(location.current_state),
                id
            ]);

            if (result.changes === 0) {
                return null;
            }

            // Fetch the updated location
            return this.findById(id);
        } catch (error) {
            logger.error('Error updating location:', error);
            throw error;
        }
    }
}

module.exports = new LocationRepository();