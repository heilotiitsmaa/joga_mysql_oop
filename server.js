// server.js
const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');        // Kasuta EJS-i vaademootorina
app.set('views', './views');          // Vaadete kaust
app.use(express.static('public'));    // Staatinud failid (CSS, JS, pildid)

// Middleware vormide andmete parsimiseks
app.use(express.urlencoded({ extended: true }));
// Ilma selleta req.body tühi!
app.use(express.json());

// Kasuta artikli ruute
app.use('/articles', articleRoutes);
app.use('/author', authorRoutes);

// Käivita server
app.listen(PORT, () => {
  console.log(`✅ Server töötab aadressil http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Serveri käivitamisel tekkis viga:', err.message);
});