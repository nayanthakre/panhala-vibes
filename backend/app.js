const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const placeRoutes = require('./routes/placeRoutes');

dotenv.config();

// 1. Connect MongoDB Atlas
connectDB();

const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Register Places Routes
app.use('/api/places', placeRoutes);

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});