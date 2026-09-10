export const images = {
  heroPanhala: '/assets/hero-panhala.jpg',
  heroVideo: '/assets/panhala-hero-video.mp4',
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
  lat: number;
  lng: number;
  tags: readonly string[];
  location: string;
  photography: string;
  familyFriendly: string;
  difficulty: string;
  about: readonly string[];
};

/** Plateau bus / taxi hub in the fort village — distances on the site are measured from here. */
export const mapOrigin = {
  name: 'Panhala Bus Stand',
  lat: 16.810311,
  lng: 74.110995,
} as const;

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
    lat: 16.808779,
    lng: 74.107812,
    tags: ['Historical Site', 'Fort'],
    location: 'Fort plateau',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Moderate',
    about: [
      'Raised in 1178 by the Shilahara king Bhoja II, Panhala Fort crowns a Sahyadri plateau about twenty kilometres from Kolhapur. Its ramparts run for kilometres along the ridge, enclosing granaries, gates and a living village.',
      'The fort became a Maratha stronghold under Chhatrapati Shivaji Maharaj. In 1660 Siddi Johar laid siege here — the night escape to Vishalgad remains one of the most famous marches in Maratha history.',
      'Today you can walk the same walls at sunrise, when mist sits in the valleys and the stone is still cool. Give yourself time: the scale of the plateau is easy to underestimate.',
    ],
  },
  {
    slug: 'sajja-kothi',
    name: 'Sajja Kothi',
    category: 'Historical',
    description: 'A hilltop pavilion tied to some of the most decisive moments in Maratha history.',
    distance: '800 m',
    duration: '35 min',
    image: images.sajjaKothi,
    lat: 16.813707,
    lng: 74.112891,
    tags: ['Historical Site', 'Viewpoint'],
    location: 'North fort wall',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Easy',
    about: [
      'Built as an observation pavilion, Sajja Kothi stands on the northern edge of Panhala Fort with sweeping views of the valleys below. Guards once used this height to spot approaching forces miles away.',
      'The structure is deeply significant in Maratha history. It was here that Chhatrapati Shivaji Maharaj imprisoned his son Sambhaji before his dramatic escape. Multi-tiered stonework and arched openings keep the pavilion cool even in peak summer.',
      'Today visitors can climb to the upper levels and look out through the same stone arches. The framed landscape makes it a favourite stop for photographers and anyone walking the north wall.',
    ],
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
    lat: 16.81128,
    lng: 74.10942,
    tags: ['Temple', 'Heritage'],
    location: 'Fort village',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Easy',
    about: [
      'A stone temple under old tree cover, Ambabai remains the spiritual centre of the fort village. Locals still come here at dawn, so the courtyards feel lived-in rather than museum-still.',
      'The shrine sits close to the heart of Panhala, a short walk from the bus stand, and pairs well with a slow morning around the fort before the day warms up.',
      'Carved stone, shade and quiet make it a good pause between the larger monuments — especially if you are visiting with family.',
    ],
  },
  {
    slug: 'teen-darwaza',
    name: 'Teen Darwaza',
    category: 'Fort Gate',
    description: 'The grand three-arched gateway that once guarded the main approach to the fort.',
    distance: '1.2 km',
    duration: '30 min',
    image: images.teenDarwaza,
    lat: 16.80736,
    lng: 74.106804,
    tags: ['Fort Gate', 'Historical Site'],
    location: 'Main approach',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Easy',
    about: [
      'Teen Darwaza is the grand three-arched gateway that once guarded the main approach to the fort. Each arch was designed to slow an attacking force and expose them to fire from above.',
      'The scale is best felt standing underneath: massive basalt, deep shadow, and the road still passing through as it has for centuries.',
      'It is one of the first landmarks you will meet if you walk in from the village side — a natural starting point for a fort circuit.',
    ],
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
    lat: 16.80648,
    lng: 74.10692,
    tags: ['Hidden Gem', 'Historical Site'],
    location: 'South-west fort',
    photography: 'Allowed',
    familyFriendly: 'With care',
    difficulty: 'Moderate',
    about: [
      'Andhar Bavadi is a hidden stepwell with dark chambers built to survive a siege. Cool even in peak summer, it supplied water when the plateau was cut off.',
      'The name means dark well — you descend into stacked arches and cisterns, a piece of military engineering as much as architecture.',
      'Take a torch or phone light, watch your step on the stone, and give it twenty quiet minutes. It is one of Panhala\'s most memorable interiors.',
    ],
  },
  {
    slug: 'tabak-udyan',
    name: 'Tabak Udyan',
    category: 'Garden',
    description: 'Terraced gardens on the fort edge with wide valley views and easy walking paths.',
    distance: '1.1 km',
    duration: '40 min',
    image: images.natureTrail,
    lat: 16.814893,
    lng: 74.110659,
    tags: ['Garden', 'Viewpoint'],
    location: 'Fort edge',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Easy',
    about: [
      'Terraced gardens on the fort edge with wide valley views and easy walking paths. Tabak Udyan is where the plateau opens out and the walk becomes leisurely.',
      'Families come here in the late afternoon; the light is kind and the paths are gentler than the rampart climbs.',
      'Pair it with Sajja Kothi nearby for a history-and-garden loop that does not rush you.',
    ],
  },
  {
    slug: 'sunset-point',
    name: 'Sunset Point',
    category: 'Viewpoint',
    description: 'Layered ridges catching the last light — the finest way to end a day in Panhala.',
    distance: '2.8 km',
    duration: '1 hr',
    image: images.sunsetPoint,
    lat: 16.811878,
    lng: 74.098113,
    tags: ['Viewpoint', 'Nature'],
    location: 'Western ridge',
    photography: 'Allowed',
    familyFriendly: 'Yes',
    difficulty: 'Easy',
    about: [
      'Layered ridges catching the last light — the finest way to end a day in Panhala. Arrive with time to spare; the last walk fills up near sunset.',
      'The western views turn gold, then violet, over the Sahyadris. Carry a light layer; the wind picks up as the sun drops.',
      'It sits farther out than the inner fort monuments, so plan it as your last stop rather than a detour between gates.',
    ],
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
    lat: 16.81621,
    lng: 74.110726,
    tags: ['Nature', 'Walking'],
    location: 'Between bastions',
    photography: 'Allowed',
    familyFriendly: 'Older kids',
    difficulty: 'Moderate',
    about: [
      'Green corridors between bastions, best walked early morning or through the monsoon mist. These paths show the living hill, not only the stone.',
      'Expect uneven ground, seasonal mud and sudden viewpoints. The trails link gardens, walls and quieter edges of the plateau.',
      'Wear grippy shoes and carry water. Two hours is enough for a satisfying loop without turning it into a trek.',
    ],
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
    lat: 16.808006,
    lng: 74.11313,
    tags: ['Hidden Gem', 'Walking'],
    location: 'Across the plateau',
    photography: 'Allowed',
    familyFriendly: 'Depends',
    difficulty: 'Moderate',
    about: [
      'Forgotten water tanks, stone stairways and viewpoints most visitors walk straight past. This is a collection of quieter corners rather than a single gate.',
      'Wander with a map pin and time to spare. Some spots are unmarked; others sit a few metres off the main path.',
      'Treat it as a slow explore after the headline monuments — the fort still hides more than a first visit can cover.',
    ],
  },
];

export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}

export function walkingLabel(distance: string): string {
  if (distance.toLowerCase() === 'varies') return 'varies';
  const kmMatch = distance.match(/([\d.]+)\s*km/i);
  const mMatch = distance.match(/([\d.]+)\s*m\b/i);
  let meters = 0;
  if (kmMatch) meters = parseFloat(kmMatch[1]) * 1000;
  else if (mMatch) meters = parseFloat(mMatch[1]);
  else return distance;
  const minutes = Math.max(1, Math.round(meters / 80));
  return `${minutes} min walk`;
}

export function placeMapsUrl(place: Pick<Place, 'lat' | 'lng'>): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
}

export function getNearbyPlaces(
  slug: string,
  limit = 2,
): { place: Place; distanceLabel: string }[] {
  const current = getPlaceBySlug(slug);
  if (!current) return places.slice(0, limit).map((place) => ({ place, distanceLabel: place.distance }));

  return places
    .filter((p) => p.slug !== slug)
    .map((place) => ({ place, km: haversineKm(current, place) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
    .map(({ place, km }) => ({
      place,
      distanceLabel: km < 1 ? `${Math.round(km * 1000)}m away` : `${km.toFixed(1)} km away`,
    }));
}

function haversineKm(a: Pick<Place, 'lat' | 'lng'>, b: Pick<Place, 'lat' | 'lng'>): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

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
