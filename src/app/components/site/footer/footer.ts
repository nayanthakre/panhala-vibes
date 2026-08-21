import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const columns = [
  {
    title: 'Explore',
    items: [
      { label: 'Places', to: '/explore' },
      { label: 'Nature', to: '/explore' },
      { label: 'History', to: '/history' },
      { label: 'Food', to: '/food' },
      { label: 'Stay', to: '/stay' },
      { label: 'Local', to: '/local' },
    ],
  },
  {
    title: 'Plan',
    items: [
      { label: 'Plan Your Visit', to: '/plan' },
      { label: 'Day Plans', to: '/plan' },
      { label: 'Nearby Places', to: '/map' },
    ],
  },
] as const;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',

})
export class FooterComponent {
  readonly columns = columns;
  readonly socials = ['Instagram', 'YouTube', 'X'] as const;
  readonly year = new Date().getFullYear();
}
