// 1. Load installed packages using CommonJS (require)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 2. Load environment variables from the .env file into process.env
dotenv.config();

// 3. Initialize the Express application instance
const app = express();

// 4. Global Middleware Setup
app.use(cors());         // Enables Cross-Origin Resource Sharing (allows frontend to fetch from backend)
app.use(express.json()); // Parses incoming JSON request bodies (e.g., req.body in POST requests)

// 5. Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB Atlas Connection Error:', err));

// 6. Review Schema and Model
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  location: { type: String, trim: true, maxlength: 60, default: null },
  title: { type: String, trim: true, maxlength: 90, default: null },
  message: { type: String, required: true, trim: true, minlength: 5, maxlength: 800 },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  created_at: { type: Date, default: Date.now }
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

// 7. API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Panhala Vibes API is healthy' });
});

// GET all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 }).limit(100);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, location, title, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ error: 'Name, message, and rating are required.' });
    }

    const newReview = new Review({
      name: name.trim(),
      location: location ? location.trim() : null,
      title: title ? title.trim() : null,
      message: message.trim(),
      rating: Number(rating) || 5,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// 8. Define Port and Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});