// models/article.js
const Model = require('./base');

class Article extends Model {
  static get tableName() {
    return 'article';
  }

  static async findAll() {
    return super.findAll();
  }
}

module.exports = Article;