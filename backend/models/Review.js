const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Added custom string ID
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  location: { type: String, trim: true, maxlength: 60, default: null },
  title: { type: String, trim: true, maxlength: 90, default: null },
  message: { type: String, required: true, trim: true, minlength: 5, maxlength: 800 },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);