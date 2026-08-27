const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');

router.get('/', getReviews);
//http://localhost:5000/api/reviews?sortBy=rating
router.post('/', createReview);

module.exports = router;