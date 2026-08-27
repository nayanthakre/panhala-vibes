import { Component, input } from '@angular/core';
import type { Review } from '@/app/lib/review-data';
import { RevealComponent } from '../reveal/reveal';
import { ReviewCardComponent } from '../review-card/review-card';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [RevealComponent, ReviewCardComponent],
  templateUrl: './review-list.html',
  host: {
    class: 'block w-full',
  },
})
export class ReviewListComponent {
  readonly reviews = input<Review[]>([]);
  readonly loading = input<boolean>(false);
}
