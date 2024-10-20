const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Get profile
router.get('/', ensureAuthenticated, profileController.getProfile);

// Update profile (removed multer)
router.post('/update', ensureAuthenticated, profileController.updateProfile);

module.exports = router;
