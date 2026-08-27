import { Component, computed, input } from '@angular/core';
import type { Review } from '@/app/lib/review-data';

@Component({
  selector: 'app-review-card',
  standalone: true,
  templateUrl: './review-card.html',
  host: {
    class: 'block h-full w-full',
  },
})
export class ReviewCardComponent {
  readonly review = input.required<Review>();

  readonly initials = computed(() => {
    const name = this.review().name || 'Anonymous';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  });

  readonly formattedDate = computed(() => {
    try {
      return new Date(this.review().created_at).toLocaleDateString(undefined, {
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  });

  readonly filledStars = computed(() => Array(Math.max(0, Math.min(5, this.review().rating))).fill(0));
  readonly emptyStars = computed(() => Array(Math.max(0, 5 - Math.min(5, this.review().rating))).fill(0));
}
