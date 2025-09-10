// models/article.js
const Model = require('./base');

class Article extends Model {
  static get tableName() {
    return 'article';
  }

  // Kui soovid, saad siin ka callbacki edasi anda
  static findAll(callback) {
    super.findAll(callback);
  }
}

module.exports = Article;