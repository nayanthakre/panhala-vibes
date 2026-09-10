import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RevealComponent, SectionHeadingComponent } from '@/app/components/site';
import {
  getNearbyPlaces,
  getPlaceBySlug,
  images,
  mapOrigin,
  placeMapsUrl,
  walkingLabel,
} from '@/app/lib/panhala-data';

@Component({
  selector: 'app-place-detail-page',
  standalone: true,
  imports: [RouterLink, RevealComponent, SectionHeadingComponent],
  templateUrl: './place-detail.html',
})
export class PlaceDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly images = images;
  readonly origin = mapOrigin;

  readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  readonly place = computed(() => getPlaceBySlug(this.slug()));
  readonly nearby = computed(() => getNearbyPlaces(this.slug(), 2));
  readonly walkLabel = computed(() => {
    const place = this.place();
    return place ? walkingLabel(place.distance) : '';
  });
  readonly mapsUrl = computed(() => {
    const place = this.place();
    return place ? placeMapsUrl(place) : '/map';
  });
  readonly facts = computed(() => {
    const place = this.place();
    if (!place) return [];
    return [
      { icon: '📍', label: 'Location', value: place.location },
      { icon: '🚶', label: 'Distance', value: `${place.distance} from ${this.origin.name}` },
      { icon: '⏱', label: 'Recommended time', value: place.duration },
      { icon: '📷', label: 'Photography', value: place.photography },
      { icon: '👨‍👩‍👧', label: 'Family friendly', value: place.familyFriendly },
      { icon: '🥾', label: 'Difficulty', value: place.difficulty },
    ];
  });

  constructor() {
    effect(() => {
      this.slug();
      if (this.isBrowser) {
        this.viewport.scrollToPosition([0, 0]);
      }
    });
  }
}
