const Place = require('../models/placeModel');

// 1. Fetch all places from MongoDB
const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Insert all static places at once (Seeding)
const seedPlaces = async (req, res) => {
  try {
    // Array of static places data
    const placesData = [
      { slug: 'panhala-fort', name: 'Panhala Fort', category: 'Historical', description: 'Explore the historic heart of Panhala — ramparts stretching along the Sahyadri ridge.', distance: '2.4 km', duration: '1–2 hrs', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/hero-panhala.jpg' },
      { slug: 'sajja-kothi', name: 'Sajja Kothi', category: 'Historical', description: 'A hilltop pavilion tied to some of the most decisive moments in Maratha history.', distance: '800 m', duration: '35 min', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569955/sajja-kothi.jpg' },
      { slug: 'ambabai-temple', name: 'Ambabai Temple', category: 'Temple', description: 'A serene stone temple under old tree cover, still the spiritual centre of the fort village.', distance: '500 m', duration: '45 min', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/ambabai-temple.jpg' },
      { slug: 'teen-darwaza', name: 'Teen Darwaza', category: 'Fort Gate', description: 'The grand three-arched gateway that once guarded the main approach to the fort.', distance: '1.2 km', duration: '30 min', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569955/teen-darwaza.jpg' },
      { slug: 'andhar-bavadi', name: 'Andhar Bavadi', category: 'Hidden Gem', description: 'A hidden stepwell with dark chambers built to survive a siege — cool, quiet, unforgettable.', distance: '1.6 km', duration: '25 min', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/andhar-bavadi.jpg' },
      { slug: 'tabak-udyan', name: 'Tabak Udyan', category: 'Garden', description: 'Terraced gardens on the fort edge with wide valley views and easy walking paths.', distance: '1.1 km', duration: '40 min', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/nature-trail.jpg' },
      { slug: 'sunset-point', name: 'Sunset Point', category: 'Viewpoint', description: 'Layered ridges catching the last light — the finest way to end a day in Panhala.', distance: '2.8 km', duration: '1 hr', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569955/sunset-point.jpg' },
      { slug: 'nature-trails', name: 'Nature Trails', category: 'Nature', description: 'Green corridors between bastions, best walked early morning or through the monsoon mist.', distance: '3.2 km', duration: '2 hrs', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/nature-trail.jpg' },
      { slug: 'hidden-places', name: 'Hidden Places', category: 'Hidden Gem', description: 'Forgotten water tanks, stone stairways and viewpoints most visitors walk straight past.', distance: 'varies', duration: '1–3 hrs', image: 'https://res.cloudinary.com/ozxfva3p/image/upload/v1787569956/andhar-bavadi.jpg' }
    ];

    // Clear old data and insert new array
    await Place.deleteMany({});
    const createdPlaces = await Place.insertMany(placesData);
    
    res.status(201).json({ message: 'Places loaded successfully!', data: createdPlaces });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlaces, seedPlaces };
