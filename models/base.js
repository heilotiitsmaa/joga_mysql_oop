// models/base.js
const db = require('../utils/db');

class Model {
  static get tableName() {
    throw new Error('tableName peab olema määratud alamklassis');
  }

  // Callback-põhine findAll
  static findAll(callback) {
    const sql = `SELECT * FROM ${this.tableName}`;
    db.query(sql, (error, results) => {
      if (error) {
        return callback(new Error(`Viga tabelis ${this.tableName}: ${error.message}`));
      }
      callback(null, results); // Esimene argument = viga, teine = andmed
    });
  }
}

module.exports = Model;