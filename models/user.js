// models/user.js
const db = require('../utils/db');

class User {
  static get tableName() {
    return 'users';
  }

  // Uue kasutaja loomine
  static create(data, callback) {
    const { username, password } = data;
    const sql = `INSERT INTO ${this.tableName} (username, password) VALUES (?, ?)`;
    db.query(sql, [username, password], (error, result) => {
      if (error) return callback(error);
      callback(null, result.insertId);
    });
  }

  // Kasutaja otsimine kasutajanime järgi
  static findByUsername(username, callback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE username = ?`;
    db.query(sql, [username], (error, results) => {
      if (error) return callback(error);
      callback(null, results[0] || null);
    });
  }

  // Kasutaja otsimine ID järgi
  static findById(id, callback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    db.query(sql, [id], (error, results) => {
      if (error) return callback(error);
      callback(null, results[0] || null);
    });
  }
}

module.exports = User;