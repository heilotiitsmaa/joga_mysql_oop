// server.js
const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();
const PORT = 3000;

// Kasuta artikli ruute
app.use('/articles', articleRoutes);
app.use('/author', authorRoutes);

// Käivita server
app.listen(PORT, () => {
  console.log(`✅ Server töötab aadressil http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Serveri käivitamisel tekkis viga:', err.message);
});