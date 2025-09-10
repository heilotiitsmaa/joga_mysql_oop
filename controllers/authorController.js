// controllers/authorController.js
const Author = require('../models/author');
const Article = require('../models/article');

const authorController = {
  // Kuvab autori andmed koos tema artiklitega
  show(req, res) {
    const { id } = req.params; // Võtab id URL-ist, nt /author/3

    // 1. Leia autor
    Author.findById(id, (error, author) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga autori laadimisel' });
      }
      if (!author) {
        return res.status(404).json({ error: 'Autorit ei leitud' });
      }

      // 2. Leia kõik artiklid, mille autor_id = author.id
      Article.findByAuthorId(author.id, (error, articles) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Serveri viga artiklite laadimisel' });
        }

        // 3. Lisa artiklid autori objekti
        author.articles = articles;

        // 4. Tagasta autor + artiklid
        res.json(author);
      });
    });
  }
};

module.exports = authorController;