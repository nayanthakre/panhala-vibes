import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
  { icon: '📍', label: 'Explore', pos: 'left-[4%] top-[26%]', delay: '0s' },
  { icon: '🏰', label: 'Heritage', pos: 'right-[6%] top-[20%]', delay: '1.4s' },
  { icon: '🌿', label: 'Nature', pos: 'right-[10%] bottom-[26%]', delay: '2.6s' },
  { icon: '🍽️', label: 'Local Food', pos: 'left-[7%] bottom-[22%]', delay: '3.8s' },
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

  initial(name: string): string {
    return name.split(' ')[0]?.[0] ?? '';
  }
}
