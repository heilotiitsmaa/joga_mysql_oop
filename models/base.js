// models/base.js
const db = require('../utils/db');

class Model {
  static get tableName() {
    throw new Error('tableName peab olema määratud alamklassis');
  }

  // Kõikide kirjete hankimine
  static findAll(callback) {
    const sql = `SELECT * FROM ${this.tableName}`;
    db.query(sql, (error, results) => {
      if (error) {
        return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
      }
      callback(null, results);
    });
  }

  // Ühe kirje hankimine vastavalt veeru väärtusele
  static findOne(where, value, callback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    db.query(sql, [value], (error, results) => {
      if (error) {
        return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
      }
      callback(null, results[0] || null); // Tagastab esimese või nulli
    });
  }
  // MITME kirje hankimine vastavalt veeru väärtusele
  static findMany(where, value, callback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
    db.query(sql, [value], (error, results) => {
      if (error) {
        return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
      }
      callback(null, results); // Tagastab kogu massiivi, mitte ainult esimese
    });
  }
  // Uue kirje lisamine andmebaasi
  static create(data, callback) {
    // Loo veerunimed ja küsimärgid (?)
    const keys = Object.keys(data);
    const values = Object.values(data);
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

    db.query(sql, values, (error, result) => {
      if (error) {
        return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
      }
      callback(null, result.insertId); // Tagasta uue kirje ID
    });
  }

// Kirje uuendamine
static update(id, data, callback) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  

  // Loo SET osa: `veerg1 = ?, veerg2 = ?`
  const setClause = keys.map(key => `${key} = ?`).join(', ');

  const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

  // Lisa id viimaseks väärtuseks
  const params = [...values, id];

  db.query(sql, params, (error, result) => {
    if (error) {
      return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
    }
    callback(null, result.affectedRows); // Tagasta muudetud ridade arv
  });
}
// Kirje kustutamine
static delete(id, callback) {
  const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
  db.query(sql, [id], (error, result) => {
    if (error) {
      return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
    }
    callback(null, result.affectedRows);
  });
}
}
module.exports = Model;