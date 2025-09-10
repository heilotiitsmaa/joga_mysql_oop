// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// API ruuterid (tagastavad JSONi)
router.get('/', articleController.index);        // GET /articles → JSON
router.get('/:slug', articleController.show);    // GET /articles/slug → JSON

// POST /articles — lisab uue artikli
router.post('/', articleController.create);

// PUT /:id — uuendab artiklit
router.put('/:id', articleController.update);

// DELETE /:id — kustutab artikli
router.delete('/:id', articleController.delete);

// HTML vaadete ruuterid (renderdavad EJS-i)
router.get('/list', articleController.indexView);        // GET /articles/list → HTML
router.get('/:slug/view', articleController.showView);   // GET /articles/slug/view → HTML

// Kuvab uue artikli vormi
router.get('/new', articleController.newView);

// Kuvab muutmise vormi
router.get('/:id/edit', articleController.editView);

// Meetodi ülekirjutamise middleware (et saaks kasutada PUT ja DELETE vormidest)
router.use((req, res, next) => {
  if (req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});

module.exports = router;