const express = require('express');
const router = express.Router();
const { getPlaces, seedPlaces } = require('../controller/placeController');

// GET request on /api/places -> Fetch all places
router.get('/', getPlaces);

// POST request on /api/places/seed -> Load static data into DB
router.post('/seed', seedPlaces);

module.exports = router;