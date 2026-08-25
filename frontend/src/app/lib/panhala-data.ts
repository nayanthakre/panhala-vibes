export const images = {
  heroPanhala: '/assets/hero-panhala.jpg',
  teenDarwaza: '/assets/teen-darwaza.jpg',
  sajjaKothi: '/assets/sajja-kothi.jpg',
  ambabaiTemple: '/assets/ambabai-temple.jpg',
  andharBavadi: '/assets/andhar-bavadi.jpg',
  natureTrail: '/assets/nature-trail.jpg',
  sunsetPoint: '/assets/sunset-point.jpg',
  foodThali: '/assets/food-thali.jpg',
  localMarket: '/assets/local-market.jpg',
  stayHeritage: '/assets/stay-heritage.jpg',
  panhalaFog1: '/assets/panhala-fog-1.jpg',
  panhalaFog2: '/assets/panhala-fog-2.jpg',
  panhalaFog3: '/assets/panhala-fog-3.jpg',
} as const;

export type Place = {
  slug: string;
  name: string;
  category: string;
  description: string;
  distance: string;
  duration: string;
  image: string;
};

export const places: Place[] = [
  {
    slug: 'panhala-fort',
    name: 'Panhala Fort',
    category: 'Historical',
    description:
      'Explore the historic heart of Panhala — ramparts stretching along the Sahyadri ridge.',
    distance: '2.4 km',
    duration: '1–2 hrs',
    image: images.heroPanhala,
  },
  {
    slug: 'sajja-kothi',
    name: 'Sajja Kothi',
    category: 'Historical',
    description: 'A hilltop pavilion tied to some of the most decisive moments in Maratha history.',
    distance: '800 m',
    duration: '35 min',
    image: images.sajjaKothi,
  },
  {
    slug: 'ambabai-temple',
    name: 'Ambabai Temple',
    category: 'Temple',
    description:
      'A serene stone temple under old tree cover, still the spiritual centre of the fort village.',
    distance: '500 m',
    duration: '45 min',
    image: images.ambabaiTemple,
  },
  {
    slug: 'teen-darwaza',
    name: 'Teen Darwaza',
    category: 'Fort Gate',
    description: 'The grand three-arched gateway that once guarded the main approach to the fort.',
    distance: '1.2 km',
    duration: '30 min',
    image: images.teenDarwaza,
  },
  {
    slug: 'andhar-bavadi',
    name: 'Andhar Bavadi',
    category: 'Hidden Gem',
    description:
      'A hidden stepwell with dark chambers built to survive a siege — cool, quiet, unforgettable.',
    distance: '1.6 km',
    duration: '25 min',
    image: images.andharBavadi,
  },
  {
    slug: 'tabak-udyan',
    name: 'Tabak Udyan',
    category: 'Garden',
    description: 'Terraced gardens on the fort edge with wide valley views and easy walking paths.',
    distance: '1.1 km',
    duration: '40 min',
    image: images.natureTrail,
  },
  {
    slug: 'sunset-point',
    name: 'Sunset Point',
    category: 'Viewpoint',
    description: 'Layered ridges catching the last light — the finest way to end a day in Panhala.',
    distance: '2.8 km',
    duration: '1 hr',
    image: images.sunsetPoint,
  },
  {
    slug: 'nature-trails',
    name: 'Nature Trails',
    category: 'Nature',
    description:
      'Green corridors between bastions, best walked early morning or through the monsoon mist.',
    distance: '3.2 km',
    duration: '2 hrs',
    image: images.natureTrail,
  },
  {
    slug: 'hidden-places',
    name: 'Hidden Places',
    category: 'Hidden Gem',
    description:
      'Forgotten water tanks, stone stairways and viewpoints most visitors walk straight past.',
    distance: 'varies',
    duration: '1–3 hrs',
    image: images.andharBavadi,
  },
];

export type NatureSpot = {
  tag: string;
  title: string;
  copy: string;
  image: string;
  images?: readonly string[];
};

export const natureSpots: NatureSpot[] = [
  {
    tag: '🌿 Monsoon Trails',
    title: 'Walk through the mist',
    copy: 'Green hills, ancient paths and clouds at eye level.',
    image: images.panhalaFog1,
    images: [
      images.panhalaFog1,
      images.panhalaFog2,
      images.panhalaFog3,
    ],
  },
  {
    tag: '🌄 Sunset Points',
    title: 'Light on the ridges',
    copy: 'Wide western views that turn gold in the last hour.',
    image: images.sunsetPoint,
    images: [images.sunsetPoint],
  },
  {
    tag: '🏞️ Viewpoints & Hill Walks',
    title: 'The green side of history',
    copy: 'Easy walks along the ramparts with valley panoramas.',
    image: images.heroPanhala,
    images: [images.heroPanhala, images.natureTrail],
  },
];

export const timeline = [
  {
    part: '🌅 Morning',
    items: [
      { time: '7:00 AM', title: 'Panhala Fort', note: 'Cool air, empty ramparts, best light.' },
      { time: '8:30 AM', title: 'Sajja Kothi', note: 'History with a valley view.' },
      { time: '9:30 AM', title: 'Local Breakfast', note: 'Misal, poha and strong chai.' },
    ],
  },
  {
    part: '☀️ Afternoon',
    items: [
      {
        time: '12:00 PM',
        title: 'Historical Places',
        note: 'Teen Darwaza, Andhar Bavadi, temples.',
      },
      { time: '1:30 PM', title: 'Maharashtrian Lunch', note: 'Thali at a family-run kitchen.' },
      {
        time: '3:00 PM',
        title: 'Local Market & Shops',
        note: 'Wood crafts, books, heritage products.',
      },
    ],
  },
  {
    part: '🌄 Evening',
    items: [
      { time: '5:00 PM', title: 'Nature / Sunset Point', note: 'Golden hour over the Sahyadris.' },
      { time: '7:00 PM', title: 'Dinner', note: 'Slow food, local spice, quiet streets.' },
      { time: '8:30 PM', title: 'Return to Stay', note: 'Hilltop stays are minutes away.' },
    ],
  },
];

export const history = [
  {
    year: '1178',
    title: 'Fort Founded',
    copy: 'Raised by the Shilahara ruler Bhoja II on the Sahyadri plateau.',
  },
  {
    year: '1489',
    title: 'Adil Shahi Era',
    copy: 'Massive gateways, bastions and granaries take their present shape.',
  },
  {
    year: '1659',
    title: 'Shivaji Maharaj',
    copy: 'Panhala becomes a key Maratha stronghold and strategic base.',
  },
  {
    year: '1660',
    title: 'The Great Siege',
    copy: "Siddi Johar's siege and the legendary escape to Vishalgad.",
  },
  {
    year: '1782',
    title: 'Maratha Capital',
    copy: 'Panhala serves as an administrative seat of the Kolhapur state.',
  },
  {
    year: 'Today',
    title: 'Living Heritage',
    copy: 'A hill town where families live inside 800-year-old walls.',
  },
];

export const people = [
  {
    name: 'Chhatrapati Shivaji Maharaj',
    role: 'Founder of the Maratha Empire',
    copy: "Held Panhala as a strategic stronghold and escaped its siege in 1660 in one of history's boldest night marches.",
  },
  {
    name: 'Baji Prabhu Deshpande',
    role: 'Maratha Commander',
    copy: 'Held the pass at Pavan Khind so his king could reach Vishalgad — a stand still remembered in song.',
  },
  {
    name: 'Tarabai Bhosale',
    role: 'Regent of the Marathas',
    copy: 'Directed Maratha resistance from these hills and shaped the Kolhapur line of rulers.',
  },
  {
    name: 'Shahu Maharaj of Kolhapur',
    role: 'Reformer & Ruler',
    copy: 'Built the schools, water works and public institutions that modernised the region around Panhala.',
  },
];

export const culture = [
  {
    icon: '🍽️',
    title: 'Traditional Food',
    copy: 'Tambda–pandhra rassa, misal and bhakri made the old way.',
  },
  {
    icon: '🛍️',
    title: 'Local Markets',
    copy: 'Morning bazaars where the fort village actually shops.',
  },
  {
    icon: '📚',
    title: 'Ancient Book Stores',
    copy: 'Marathi histories, old maps and out-of-print fort records.',
  },
  {
    icon: '🪵',
    title: 'Traditional Wood Shops',
    copy: 'Hand-turned wooden toys, tools and household pieces.',
  },
  { icon: '🎨', title: 'Local Crafts', copy: 'Kolhapuri leatherwork, weaves and stone carving.' },
  {
    icon: '☕',
    title: 'Local Cafés',
    copy: 'Small terraces with chai, valley views and no rush.',
  },
  {
    icon: '🏺',
    title: 'Heritage Products',
    copy: 'Jaggery, spice blends and pottery from nearby villages.',
  },
];

export const foods = [
  {
    name: 'Sahyadri Misal House',
    dish: 'Kolhapuri Misal',
    cuisine: 'Maharashtrian',
    price: '₹',
    distance: '600 m',
    rating: 4.8,
    image: images.foodThali,
  },
  {
    name: 'Fort View Bhojanalaya',
    dish: 'Village Thali',
    cuisine: 'Thali · Veg',
    price: '₹₹',
    distance: '1.1 km',
    rating: 4.6,
    image: images.foodThali,
  },
  {
    name: 'Tabak Chai Corner',
    dish: 'Chai & Bhaji',
    cuisine: 'Snacks · Café',
    price: '₹',
    distance: '1.4 km',
    rating: 4.5,
    image: images.localMarket,
  },
];

export const stays = [
  {
    name: 'Panhala Heritage Retreat',
    location: 'Near Teen Darwaza',
    price: '₹3,200 – ₹5,500',
    rating: 4.7,
    distance: '1.2 km from fort',
    amenities: ['Valley view', 'Breakfast', 'Parking', 'Guide desk'],
    image: images.stayHeritage,
  },
  {
    name: 'Sahyadri Hill Homestay',
    location: 'Fort village',
    price: '₹1,800 – ₹2,900',
    rating: 4.5,
    distance: '500 m from Ambabai Temple',
    amenities: ['Home food', 'Terrace', 'Trek help'],
    image: images.stayHeritage,
  },
  {
    name: 'Cloudline Resort',
    location: 'Panhala ghat road',
    price: '₹4,500 – ₹7,800',
    rating: 4.6,
    distance: '2.6 km from Sunset Point',
    amenities: ['Pool', 'Restaurant', 'Bonfire', 'Spa'],
    image: images.stayHeritage,
  },
];

export const shops = [
  { title: 'Ancient Book Stores', copy: 'Fort histories, maps and Marathi classics.', icon: '📚' },
  {
    title: 'Traditional Wood Shops',
    copy: 'Hand-carved toys, kitchen tools and furniture.',
    icon: '🪵',
  },
  { title: 'Handicrafts', copy: 'Kolhapuri chappals, weaves and metalwork.', icon: '🎨' },
  { title: 'Local Products', copy: 'Jaggery, spices, papad and pickles.', icon: '🏺' },
  { title: 'Souvenirs', copy: 'Fort prints, miniatures and postcards.', icon: '🎁' },
  { title: 'Traditional Items', copy: 'Brassware, lamps and puja essentials.', icon: '🪔' },
];

export const exploreFilters = [
  { icon: '🏰', label: 'Places', to: '/explore' },
  { icon: '🌿', label: 'Nature', to: '/explore' },
  { icon: '🍽️', label: 'Food', to: '/food' },
  { icon: '🏨', label: 'Stay', to: '/stay' },
  { icon: '🛍️', label: 'Local Shops', to: '/local' },
] as const;
