export type Review = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  title: string | null;
  message: string;
  created_at: string;
};

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Aarti Deshmukh',
    location: 'Pune',
    rating: 5,
    title: 'Monsoon magic at the fort',
    message:
      'Walked the ramparts at 7 AM with clouds rolling in. The Andhar Bavadi stepwell was the highlight — cool, quiet and completely empty.',
    created_at: '2026-08-15T09:30:00.000Z',
  },
  {
    id: 'rev-2',
    name: 'Rohan Patil',
    location: 'Mumbai',
    rating: 5,
    title: 'Best misal of my life',
    message:
      'Started with Kolhapuri misal near Teen Darwaza, then Sajja Kothi and Sunset Point. One perfect day, exactly as the plan suggested.',
    created_at: '2026-08-10T14:15:00.000Z',
  },
  {
    id: 'rev-3',
    name: 'Sneha Kulkarni',
    location: 'Kolhapur',
    rating: 5,
    title: 'Living heritage',
    message:
      'Families still living inside 800-year-old walls makes it special. Carry water for the longer trails — few shops on the way to the viewpoints.',
    created_at: '2026-08-02T18:45:00.000Z',
  },
  {
    id: 'rev-4',
    name: 'Amit Shinde',
    location: 'Bengaluru',
    rating: 5,
    title: 'Great morning nature trail',
    message:
      'The weather was crisp and refreshing. We took the perimeter trail along the bastions at 7 AM. Peaceful, full of birdsong, and very well-preserved stone ruins.',
    created_at: '2026-07-25T08:00:00.000Z',
  },
];
