const db = require("../config/database");
const logger = require("../config/logger");

class CharacterRepository {
  async create(character) {
    return new Promise((resolve, reject) => {
      const { name, visual_features, current_location } = character;

      db.run(
        `INSERT INTO characters (name, visual_features, current_location)
         VALUES (?, ?, ?)`,
        [name, JSON.stringify(visual_features), current_location],
        function (err) {
          if (err) {
            logger.error("Error creating character:", err);
            reject(err);
          }
          resolve(this.lastID);
        },
      );
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM characters WHERE id = ?", [id], (err, row) => {
        if (err) {
          logger.error("Error finding character:", err);
          reject(err);
        }
        if (row && row.visual_features) {
          row.visual_features = JSON.parse(row.visual_features);
        }
        resolve(row);
      });
    });
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM characters ORDER BY created_at DESC",
        [],
        (err, rows) => {
          if (err) {
            logger.error("Error finding characters:", err);
            reject(err);
          }
          rows.forEach((row) => {
            if (row.visual_features) {
              row.visual_features = JSON.parse(row.visual_features);
            }
          });
          resolve(rows);
        },
      );
    });
  }
}

module.exports = new CharacterRepository();
