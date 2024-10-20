const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Add a review
router.post('/add', ensureAuthenticated, reviewController.addReview);

module.exports = router;
