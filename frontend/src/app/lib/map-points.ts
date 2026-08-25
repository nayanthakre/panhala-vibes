import { images } from '@/app/lib/panhala-data';

export type MapPoint = {
  name: string;
  label: string;
  coords: [number, number];
  description: string;
  image: string;
};

export const mapPoints: MapPoint[] = [
  {
    name: 'bus-stand',
    label: 'Panhala Bus Stand',
    coords: [16.812, 74.113],
    description: 'Main starting point for fort walks and local transport.',
    image: images.heroPanhala,
  },
  {
    name: 'panhala-fort',
    label: 'Panhala Fort',
    coords: [16.8112, 74.1181],
    description: 'Historic hill fort with long ramparts and scenic viewpoints.',
    image: images.teenDarwaza,
  },
  {
    name: 'teen-darwaza',
    label: 'Teen Darwaza',
    coords: [16.8104, 74.1165],
    description: 'The iconic three-arched gateway guarding the fort approach.',
    image: images.teenDarwaza,
  },
  {
    name: 'sajja-kothi',
    label: 'Sajja Kothi',
    coords: [16.8095, 74.1194],
    description: 'A hilltop pavilion known for views and Maratha history.',
    image: images.sajjaKothi,
  },
  {
    name: 'ambabai-temple',
    label: 'Ambabai Temple',
    coords: [16.8126, 74.1199],
    description: 'A peaceful temple near the fort village and old pathways.',
    image: images.ambabaiTemple,
  },
  {
    name: 'sunset-point',
    label: 'Sunset Point',
    coords: [16.8191, 74.1148],
    description: 'Best for golden-hour ridgeline views over the Sahyadris.',
    image: images.sunsetPoint,
  },
  {
    name: 'nature-trail',
    label: 'Nature Trail',
    coords: [16.8162, 74.1109],
    description: 'A green trail through misty slopes and quiet fort edges.',
    image: images.natureTrail,
  },
];
