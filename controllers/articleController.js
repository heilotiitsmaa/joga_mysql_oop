// controllers/articleController.js
const Article = require('../models/article');

const articleController = {
  index(req, res) {
    Article.findAll((error, articles) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artiklite laadimisel' });
      }
      res.json(articles); // Tagasta JSONina
    });
  },
  // Kuvab ühe artikli slugi järgi
  show(req, res) {
    const { slug } = req.params; // Võtab slugi URL-ist, nt /articles/introduction-to-ashtanga
    Article.findBySlug(slug, (error, article) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli laadimisel' });
      }
      if (!article) {
        return res.status(404).json({ error: 'Artiklit ei leitud' });
      }
      res.json(article);
    });
  }
};

module.exports = articleController;