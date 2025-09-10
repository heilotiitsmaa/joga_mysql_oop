// models/base.js
const db = require('../utils/db'); // db.js file

class Model {
  static get tableName() {
    throw new Error('tableName peab olema määratud');
  }

  static async findAll() {
    const sql = `SELECT * FROM ${this.tableName}`;
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Viga tabelis ${this.tableName}: ${error.message}`);
    }
  }
}

module.exports = Model;