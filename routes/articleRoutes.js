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

module.exports = router;