// index.js
const express = require('express');
const session = require('express-session');
const engine = require('ejs-locals');
const path = require('path');

// Ruuterid
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();
app.engine('ejs', engine);
const PORT = 3000;

// 1. Vaadete mootori seadistamine (EJS) [cite: 12]
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Määrab vaadete kausta asukoha [cite: 18]

// 2. Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Staatilised failid [cite: 13]
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// 3. Sessioonid (Vajalik rollide kontrolliks) [cite: 4, 10]
app.use(session({
  secret: 'joga-salajane-voti-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// 4. Marsruudid (Routes)
app.use('/article', articleRoutes);
app.use('/user', userRoutes);
app.use('/author', authorRoutes); // Kasuta ka autorite ruute

// Juurmarsruut suunab artiklite loendisse, et brauseris kohe midagi näha oleks 
app.get('/', (req, res) => {
  res.redirect('/article/list'); 
});

app.listen(PORT, () => {
  console.log(`✅ Server töötab http://localhost:${PORT}`);
});