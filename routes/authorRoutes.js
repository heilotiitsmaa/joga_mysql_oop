// routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// GET /author/:id — kuvab autori andmed koos artiklitega
router.get('/:id', authorController.show);

module.exports = router;