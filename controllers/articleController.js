// controllers/articleController.js
const Article = require('../models/article');

const articleController = {
  async index(req, res) {
    try {
      const articles = await Article.findAll();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = articleController;