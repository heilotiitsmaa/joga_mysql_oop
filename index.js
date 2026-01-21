// index.js
const express = require('express');
const session = require('express-session');

// Ruuterid
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Port
const PORT = 3000;

// Middleware – JÄRJESTUS ON OLULINE!
app.use(express.static('public')); // Staatiliste failide jaoks (pildid, CSS jne)
app.use(express.urlencoded({ extended: true })); // Form-data parsimiseks (nt vormidest)
app.use(express.json()); // JSON-i parsimiseks (nt Postmanist)

// Sessioonid
app.use(session({
  secret: 'joga-salajane-voti-2026', // MUUDA TOOTMISES!
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true ainult HTTPS korral
}));

// Vaadete mootor
app.set('view engine', 'ejs');

// Marsruudid
app.use('/article', articleRoutes);
app.use('/user', userRoutes);

// Valikuline: juurte marsruut (et brauseris midagi näha oleks)
app.get('/', (req, res) => {
  res.send('Joga API töötab! Proovi <a href="/article/list">artiklite loendit</a>.');
});

// Serveri käivitamine
app.listen(PORT, () => {
  console.log(`✅ Server töötab http://localhost:${PORT}`);
});