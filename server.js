// server.js
const express = require('express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = 3000;

// Kasuta artikli ruute
app.use('/articles', articleRoutes);

// Käivita server
// Käivita server
app.listen(PORT, () => {
  console.log(`✅ Server töötab aadressil http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Serveri käivitamisel tekkis viga:', err.message);
});