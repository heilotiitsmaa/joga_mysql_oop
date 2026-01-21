// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
  // Registreerimine
  register(req, res) {
    const { username, password } = req.body;

    // Lihtne valideerimine
    if (!username || !password) {
      return res.status(400).json({ error: 'Kasutajanimi ja parool on kohustuslikud' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Parool peab olema vähemalt 6 tähemärki pikk' });
    }

    // Kontrolli, kas kasutajanimi on juba olemas
    User.findByUsername(username, (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Andmebaasi viga' });
      }
      if (existingUser) {
        return res.status(409).json({ error: 'Kasutajanimi on juba võetud' });
      }

      // Krüpteeri parool
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Parooli krüpteerimise viga' });
        }

        // Salvesta andmebaasi
        User.create({ username, password: hash }, (err, userId) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Kasutaja registreerimise viga' });
          }

          // Loo sessioon
          req.session.userId = userId;
          req.session.username = username;

          res.status(201).json({
            message: 'Kasutaja edukalt registreeritud',
            user: { id: userId, username }
          });
        });
      });
    });
  }

  // Sisselogimine
  login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Kasutajanimi ja parool on kohustuslikud' });
    }

    User.findByUsername(username, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Andmebaasi viga' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Vale kasutajanimi või parool' });
      }

      // Võrdle paroole
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Autentimise viga' });
        }
        if (!isMatch) {
          return res.status(401).json({ error: 'Vale kasutajanimi või parool' });
        }

        // Loo sessioon
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
          message: 'Sisselogimine õnnestus',
          user: { id: user.id, username: user.username }
        });
      });
    });
  }

  // Väljalogimine
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Väljalogimise viga' });
      }
      res.json({ message: 'Väljalogimine õnnestus' });
    });
  }
}

module.exports = UserController;