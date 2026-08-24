const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  distance: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Place', placeSchema);