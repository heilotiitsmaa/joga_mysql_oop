// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Lisame ruuterid
const articleRoutes = require('./routes/articleRoutes');
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server töötab http://localhost:${PORT}`);
});