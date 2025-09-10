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
  },
  // Uue artikli lisamine
  create(req, res) {
    const { name, slug, image, body, author_id } = req.body; // Võta andmed req.body-st

    // Kontrolli, kas kõik vajalikud väljad on olemas
    if (!name || !slug || !image || !body || !author_id) {
      return res.status(400).json({ error: 'Kõik väljad on kohustuslikud' });
    }

    // Loo artikli objekt
    const articleData = {
      name,
      slug,
      image,
      body,
      author_id,
      // published lisatakse automaatselt mudelis
    };
    // Lisa artikkel andmebaasi
    Article.create(articleData, (error, insertId) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli lisamisel' });
      }

      // Lisa insertId tagasi objekti
      articleData.id = insertId;

      // Tagasta loodud artikkel
      res.status(201).json({
        message: 'Artikkel on edukalt loodud',
        article: articleData
      });
    });
  }
};

module.exports = articleController;