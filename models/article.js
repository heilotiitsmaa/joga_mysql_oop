// models/article.js
const Model = require('./base');

class Article extends Model {
  static get tableName() {
    return 'article';
  }

  // Koikide artiklite hankimine
  static findAll(callback) {
    super.findAll(callback);
  }

  // Ühe artikli hankimine slug alusel
  static findOneBySlug(slug, callback) {
    super.findOne('slug', slug, callback);
  }
  
  // MITME artikli hankimine author_id järgi
  static findByAuthorId(authorId, callback) {
    this.findMany('author_id', authorId, callback);
  }
}

module.exports = Article;