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
  }
};

module.exports = articleController;