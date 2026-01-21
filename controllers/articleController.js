// controllers/articleController.js
const Article = require('../models/article');

class ArticleController {
  // Kõigi artiklite hankimine (JSON)
  index(req, res) {
    Article.findAll((error, articles) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artiklite laadimisel' });
      }
      res.json(articles);
    });
  }

  // Üksiku artikli hankimine slugi järgi (JSON)
  show(req, res) {
    const { slug } = req.params;
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

  // Uue artikli lisamine
  create(req, res) {
    const { name, slug, image, body, author_id } = req.body;

    if (!name || !slug || !image || !body || !author_id) {
      return res.status(400).json({ error: 'Kõik väljad on kohustuslikud' });
    }

    const articleData = { name, slug, image, body, author_id };

    Article.create(articleData, (error, insertId) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli lisamisel' });
      }
      articleData.id = insertId;
      res.status(201).json({
        message: 'Artikkel on edukalt loodud',
        article: articleData
      });
    });
  }

  // Artikli uuendamine
  update(req, res) {
    const { id } = req.params;
    const { name, slug, image, body, author_id, published } = req.body;

    if (!name || !slug || !image || !body || !author_id) {
      return res.status(400).json({ error: 'Kõik väljad on kohustuslikud' });
    }

    const articleData = {
      name,
      slug,
      image,
      body,
      author_id,
      published: published || undefined
    };

    Article.update(id, articleData, (error, affectedRows) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli uuendamisel' });
      }
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Artiklit ei leitud või muudatusi ei tehtud' });
      }
      res.json({
        message: 'Artikkel on edukalt uuendatud',
        article: { id, ...articleData }
      });
    });
  }

  // Artikli kustutamine
  delete(req, res) {
    const { id } = req.params;
    Article.delete(id, (error, affectedRows) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli kustutamisel' });
      }
      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Artiklit ei leitud' });
      }
      res.json({
        message: 'Artikkel on edukalt kustutatud',
        id: id
      });
    });
  }

  // HTML vaated
  indexView(req, res) {
    Article.findAll((error, articles) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Serveri viga');
      }
      if (!articles || articles.length === 0) {
        return res.status(404).json({ error: 'Artiklit ei leitud' });
      }
      res.render('articles/index', { articles });
    });
  }

  showView(req, res) {
    const { slug } = req.params;
    Article.findBySlug(slug, (error, article) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Serveri viga');
      }
      if (!article) {
        return res.status(404).send('Artiklit ei leitud');
      }
      res.render('articles/show', { article });
    });
  }

  newView(req, res) {
    res.render('articles/new');
  }

  editView(req, res) {
    const { id } = req.params;
    Article.findById(id, (error, article) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Serveri viga');
      }
      if (!article) {
        return res.status(404).send('Artiklit ei leitud');
      }
      res.render('articles/edit', { article });
    });
  }
}

module.exports = ArticleController;