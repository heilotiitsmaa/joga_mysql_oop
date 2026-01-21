// routes/articleRouter.js
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController'); // Muudatus: suur algustäht

const articleController = new ArticleController(); // Loome eksemplari

// API ruuterid
router.get('/', articleController.index);
router.get('/:slug', articleController.show);
router.post('/', articleController.create);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);

// HTML vaated
router.get('/list', articleController.indexView);
router.get('/:slug/view', articleController.showView);
router.get('/new', articleController.newView);
router.get('/:id/edit', articleController.editView);

// _method middleware
router.use((req, res, next) => {
  if (req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});

module.exports = router;