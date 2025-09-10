// models/author.js
const Model = require('./base');

class Author extends Model {
  static get tableName() {
    return 'author';
  }

  // Kõikide autorite hankimine
  static findAll(callback) {
    super.findAll(callback);
  }

  // Ühe autori hankimine id järgi
  static findById(id, callback) {
    this.findOne('id', id, callback);
  }
}

module.exports = Author;