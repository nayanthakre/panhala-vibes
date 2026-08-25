import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Place } from '@/app/lib/panhala-data';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './place-card.html',
  host: {
    class: 'block h-full w-full',
  },
})
export class PlaceCardComponent {
  readonly place = input.required<Place>();
}
