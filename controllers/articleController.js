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
  },
  // Artikli uuendamine
update(req, res) {
  const { id } = req.params;
  const { name, slug, image, body, author_id, published } = req.body;

  // Kontrolli, kas kõik vajalikud väljad on olemas
  if (!name || !slug || !image || !body || !author_id) {
    return res.status(400).json({ error: 'Kõik väljad on kohustuslikud' });
  }

  const articleData = {
    name,
    slug,
    image,
    body,
    author_id,
    published: published || undefined // Kui published on tühi, siis jätame seda muutmata
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
  },
  // Kuvab kõik artiklid HTMLina
indexView(req, res) {
  Article.findAll((error, articles) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Serveri viga');
    }
    res.render('articles/index', { articles });
  });
},

// Kuvab ühe artikli HTMLina
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
},
// Kuvab uue artikli vormi
newView(req, res) {
  res.render('articles/new');
},

// Kuvab artikli muutmise vormi
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
};


module.exports = articleController;