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

// 6. Test API Route (Endpoint for frontend verification)
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Backend connected successfully!' });
});

// 7. Define Port and Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});