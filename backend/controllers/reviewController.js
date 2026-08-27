const Review = require('../models/Review');

// GET /api/reviews - Fetch all reviews
const getReviews = async (req, res) => {
  try {
    const { sortBy, order, limit } = req.query;

    // 1. Set default sorting strategy (newest reviews first)
    let sortOptions = { created_at: -1 };

    // 2. Check if client requested sorting by rating
    if (sortBy === 'rating') {
      // order === 'asc' for lowest first (1), otherwise default to highest first (-1)
      const sortOrder = order === 'asc' ? 1 : -1;
      
      // Sort primarily by rating, and secondarily by newest date
      sortOptions = { rating: sortOrder, created_at: -1 };
    }

    // Parse limit parameter, default to 100 if not specified
    const limitVal = limit ? parseInt(limit, 10) : 100;

    // 3. Fetch from MongoDB applying the dynamic sort and limit
    const reviews = await Review.find()
      .sort(sortOptions)
      .limit(limitVal);

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// POST /api/reviews - Create new review
const createReview = async (req, res) => {
  try {
    const { id, name, location, title, message, rating, created_at } = req.body;

    if (!id || !name || !message || rating === undefined) {
      return res.status(400).json({ 
        error: 'id, name, message, and rating are required.' 
      });
    }

    const newReview = new Review({
      id: id.trim(),
      name: name.trim(),
      location: location ? location.trim() : null,
      title: title ? title.trim() : null,
      message: message.trim(),
      rating: Number(rating),
      created_at: created_at ? new Date(created_at) : Date.now()
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Review with this ID already exists.' });
    }

    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
};

module.exports = { getReviews, createReview };