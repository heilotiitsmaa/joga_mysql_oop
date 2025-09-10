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
  static findBySlug(slug, callback) {
    this.findOne('slug', slug, callback);
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

  static update(id, data, callback) {
  // Kui published on tühi, siis jätame seda muutmata
  if (data.published === '') {
    delete data.published;
  }
      super.update(id, data, callback);
  }
  // Artikli kustutamine
static delete(id, callback) {
  super.delete(id, callback);
}
  
  // Ühe artikli hankimine id järgi
static findById(id, callback) {
  this.findOne('id', id, callback);
}
}

module.exports = Article;