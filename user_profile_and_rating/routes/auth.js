const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest } = require('../middleware/authMiddleware');

// Register route
router.get('/register', ensureGuest, (req, res) => res.render('register'));
router.post('/register', authController.registerUser);

// Login route
router.get('/login', ensureGuest, (req, res) => res.render('login'));
router.post('/login', authController.loginUser);

// Logout route
router.get('/logout', authController.logoutUser);

module.exports = router;
