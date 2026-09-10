import { NgClass } from '@angular/common';
import { afterNextRender, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PlaceCardComponent,
  RevealComponent,
  ReviewCardComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import {
  culture,
  exploreFilters,
  foods,
  history,
  images,
  natureSpots,
  people,
  places,
  shops,
  stays,
  timeline,
} from '@/app/lib/panhala-data';
import { ReviewService } from '@/app/services/review.service';

const heroChips = [
  { icon: '📍', label: 'Explore', pos: 'left-[4%] top-[26%]', hideXl: false },
  { icon: '🏰', label: 'Heritage', pos: 'right-[6%] top-[16%]', hideXl: false },
  { icon: '🌿', label: 'Nature', pos: 'right-[10%] bottom-[26%]', hideXl: true },
  { icon: '🍽️', label: 'Local Food', pos: 'left-[7%] bottom-[22%]', hideXl: false },
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    PlaceCardComponent,
    RevealComponent,
    ReviewCardComponent,
    SectionHeadingComponent,
  ],
  templateUrl: './home.html',
})
export class HomePage {
  private readonly reviewService = inject(ReviewService);
  private readonly heroVideoEl = viewChild<ElementRef<HTMLVideoElement>>('heroVideo');

  readonly images = images;
  readonly places = places;
  readonly exploreFilters = exploreFilters;
  readonly timeline = timeline;
  readonly natureSpots = natureSpots;
  readonly history = history;
  readonly people = people;
  readonly culture = culture;
  readonly foods = foods;
  readonly stays = stays;
  readonly shops = shops;
  readonly heroChips = heroChips;
  readonly nearbyPlaces = places.slice(0, 6);
  readonly recentReviews = computed(() => this.reviewService.reviews().slice(0, 3));

  constructor() {
    afterNextRender(() => {
      void this.heroVideoEl()?.nativeElement.play().catch(() => undefined);
    });
  }

  initial(name: string): string {
    return name.split(' ')[0]?.[0] ?? '';
  }
}
