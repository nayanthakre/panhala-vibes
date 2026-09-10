import { RenderMode, ServerRoute } from '@angular/ssr';
import { places } from './lib/panhala-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'map',
    renderMode: RenderMode.Client,
  },
  {
    path: 'explore/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return places.map((place) => ({ slug: place.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
