// index.js
const express = require('express');
const articleRoutes = require('./routes/articleRoutes');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Meetodi ülekirjutamise tugi (POST → PUT/DELETE)
app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});

// Marsruudid
app.use('/articles', articleRoutes); // Või /articles – kuidas soovid

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server töötab http://localhost:${PORT}`);
});