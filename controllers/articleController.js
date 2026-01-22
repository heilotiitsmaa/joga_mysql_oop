// controllers/articleController.js
const Article = require('../models/article');

class ArticleController {
  // --- API MEETODID (Postmani jaoks) ---

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

  // Uue artikli lisamine (andmete salvestamine)
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
      
      // Kui päring tuli veebivormist, suuname loendisse
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        return res.redirect('/article/list');
      }

      res.status(201).json({
        message: 'Artikkel on edukalt loodud',
        article: { id: insertId, ...articleData }
      });
    });
  }

  // Artikli uuendamine
  update(req, res) {
    const { id } = req.params;
    const { name, slug, image, body, author_id, published } = req.body;

    const articleData = {
      name, slug, image, body, author_id,
      published: published || undefined
    };

    Article.update(id, articleData, (error, affectedRows) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Serveri viga artikli uuendamisel' });
      }
      
      // Kui päring tuli veebivormist
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        return res.redirect('/article/list');
      }

      res.json({ message: 'Artikkel on edukalt uuendatud' });
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
      res.json({ message: 'Artikkel on edukalt kustutatud', id });
    });
  }

  // --- VAADETE MEETODID (Veebilehitseja jaoks) [cite: 18, 19] ---

  // Kuvab kõik artiklid (list.php või index.ejs põhjal) [cite: 14]
  indexView(req, res) {
    Article.findAll((error, articles) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Serveri viga');
      }
      res.render('articles/index', { articles }); // Kasutab views/articles/index.ejs [cite: 12]
    });
  }

  // Kuvab ühe artikli detailvaate [cite: 15]
  showView(req, res) {
    const { slug } = req.params;
    Article.findBySlug(slug, (error, article) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Serveri viga');
      }
      if (!article) return res.status(404).send('Artiklit ei leitud');
      res.render('articles/show', { article });
    });
  }

  // Kuvab uue artikli lisamise vormi [cite: 16, 17]
  newView(req, res) {
    res.render('articles/new');
  }

  // Kuvab artikli muutmise vormi
  editView(req, res) {
    const { id } = req.params;
    Article.findById(id, (error, article) => {
      if (error || !article) return res.status(404).send('Artiklit ei leitud');
      res.render('articles/edit', { article });
    });
  }
}

module.exports = ArticleController;