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
}

module.exports = Model;