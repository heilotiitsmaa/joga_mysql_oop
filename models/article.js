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
   // Uue artikli lisamine
  static create(data, callback) {
    // Lisa automaatselt published kuupäev, kui seda pole
    if (!data.published) {
      data.published = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    super.create(data, callback);
  }
}

module.exports = Article;