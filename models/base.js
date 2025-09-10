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
}

module.exports = Model;