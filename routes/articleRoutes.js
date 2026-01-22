// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

const articleController = new ArticleController();

// --- HTML VAATED (Brauseris testimiseks) ---

// 1. Artiklite nimekiri: http://localhost:3000/article/list
router.get('/list', articleController.indexView);

// 2. Uue artikli lisamise vorm: http://localhost:3000/article/new
router.get('/new', articleController.newView);

// 3. Üksiku artikli vaatamine: http://localhost:3000/article/show/:slug
// NB! Muutsin nime 'show', et see ühtiks sinu kontrolleri meetodiga
router.get('/show/:slug', articleController.showView);

// 4. Artikli muutmise vorm: http://localhost:3000/article/edit/:id
router.get('/edit/:id', articleController.editView);


// --- API / ANDMETE SALVESTAMINE (Vormide POST päringud) ---

// Uue artikli salvestamine
router.post('/create', articleController.create);

// Olemasoleva artikli uuendamine
// Kuna HTML vorm ei toeta PUT meetodit, kasutame POST-i
router.post('/update/:id', articleController.update);

// Artikli kustutamine
router.post('/delete/:id', articleController.delete);


// --- JSON API (Postmani jaoks alles jäänud) ---
router.get('/api', articleController.index);
router.get('/api/:slug', articleController.show);

module.exports = router;