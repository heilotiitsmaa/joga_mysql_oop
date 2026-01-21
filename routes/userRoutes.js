// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

// Autoriseerimise vahetarkvara (Middleware)
const authorize = (roles = []) => {
  return (req, res, next) => {
    // 1. Kontrolli, kas kasutaja on sisselogitud
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Palun logi sisse' });
    }

    // 2. Kontrolli, kas kasutaja roll on lubatud nimekirjas
    if (roles.length && !roles.includes(req.session.role)) {
      return res.status(403).json({ error: 'Teil puuduvad selleks tegevuseks õigused' });
    }

    next();
  };
};

// Avalikud marsruudid
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Näidismarsruut: Ainult sisselogitud kasutajatele (nii user kui admin)
router.get('/profile', authorize(['user', 'admin']), (req, res) => {
  res.json({ message: `Tere tulemast, ${req.session.username}! Sinu roll on: ${req.session.role}` });
});

// Näidismarsruut: Ainult administraatoritele
router.get('/admin-panel', authorize(['admin']), (req, res) => {
  res.json({ message: 'Tere tulemast administraatori paneeli!' });
});

module.exports = router;