// models/user.js
const db = require('../utils/db');

class User {
  static get tableName() {
    return 'users';
  }

  // Uue kasutaja loomine (täiendatud rolliga)
  static create(data, callback) {
    // Lisame 'role' välja, vaikimisi väärtus on 'user' 
    const { username, password, role = 'user' } = data; 
    const sql = `INSERT INTO ${this.tableName} (username, password, role) VALUES (?, ?, ?)`;
    
    db.query(sql, [username, password, role], (error, result) => {
      if (error) return callback(error);
      callback(null, result.insertId);
    });
  }

  // Kasutaja otsimine kasutajanime järgi (toob kaasa ka rolli) 
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