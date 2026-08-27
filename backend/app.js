const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
  const connectDB = require('./config/db');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Global Middleware
app.use(cors()); // Enable CORS for Angular frontend
app.use(express.json()); // Parse JSON request bodies

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Panhala Vibes API is healthy' });
});

// Mount modular review routes
app.use('/api/reviews', reviewRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});