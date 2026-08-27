import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Panhala Vibes  — Where History Meets the Sahyadris',
        loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
      },
      {
        path: 'explore',
        title: 'Explore Panhala — Fort Places, Trails & Hidden Gems',
        loadComponent: () => import('./pages/explore/explore').then((m) => m.ExplorePage),
      },
      {
        path: 'plan',
        title: 'Plan Your Panhala Visit — One-Day Itinerary',
        loadComponent: () => import('./pages/plan/plan').then((m) => m.PlanPage),
      },
      {
        path: 'food',
        title: 'Taste Panhala — Local Food, Misal & Maharashtrian Thali',
        loadComponent: () => import('./pages/food/food').then((m) => m.FoodPage),
      },
      {
        path: 'stay',
        title: 'Stay Around Panhala — Heritage Retreats & Hill Homestays',
        loadComponent: () => import('./pages/stay/stay').then((m) => m.StayPage),
      },
      {
        path: 'local',
        title: 'Local Panhala — Markets, Crafts, Book Stores & Wood Shops',
        loadComponent: () => import('./pages/local/local').then((m) => m.LocalPage),
      },
      {
        path: 'history',
        title: 'Panhala History — Stories Behind the Stones',
        loadComponent: () => import('./pages/history/history').then((m) => m.HistoryPage),
      },
      {
        path: 'map',
        title: 'Panhala Map & Distances — Nearby Places',
        loadComponent: () => import('./pages/map/map').then((m) => m.MapPage),
      },
      {
        path: 'reviews',
        title: 'Panhala Reviews & Stories — Community Experiences',
        loadComponent: () => import('./pages/reviews/reviews').then((m) => m.ReviewsPage),
      },
      {
        path: '**',
        title: 'Page not found — Panhala Vibes',
        loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
      },
    ],
  },
];
