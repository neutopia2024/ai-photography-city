// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger');

class Database {
    constructor() {
        this.db = new sqlite3.Database('./database.sqlite', (err) => {
            if (err) {
                logger.error('Error connecting to database:', err);
            } else {
                logger.info('Connected to SQLite database');
            }
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    logger.error('Error running sql: ' + sql);
                    logger.error(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    logger.error('Error running sql: ' + sql);
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    logger.error('Error running sql: ' + sql);
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

// Export a single instance
const database = new Database();
module.exports = database;