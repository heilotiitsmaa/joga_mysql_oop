// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// GET /articles — kuvab kõik artiklid
router.get('/', articleController.index);

// GET /articles/:slug — kuvab ühe artikli slugi järgi
router.get('/:slug', articleController.show);

// POST /articles — lisab uue artikli
router.post('/', articleController.create); //

// PUT /:id — uuendab artiklit
router.put('/:id', articleController.update);

// Kuvab kõik artiklid HTMLina
router.get('/', articleController.indexView);

// Kuvab ühe artikli HTMLina
router.get('/:slug', articleController.showView);

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