import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PlaceCardComponent,
  RevealComponent,
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
  shops,
  stays,
  timeline,
  type Place,
} from '@/app/lib/panhala-data';
import { PlaceService } from '@/app/services/place.service';

const heroChips = [
  { icon: '📍', label: 'Explore', pos: 'left-[4%] top-[26%]', delay: '0s' },
  { icon: '🏰', label: 'Heritage', pos: 'right-[6%] top-[20%]', delay: '1.4s' },
  { icon: '🌿', label: 'Nature', pos: 'right-[10%] bottom-[26%]', delay: '2.6s' },
  { icon: '🍽️', label: 'Local Food', pos: 'left-[7%] bottom-[22%]', delay: '3.8s' },
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, RouterLink, PlaceCardComponent, RevealComponent, SectionHeadingComponent],
  templateUrl: './home.html',
})
export class HomePage implements OnInit {
  private readonly placeService = inject(PlaceService);

  readonly images = images;
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
  nearbyPlaces: Place[] = [];

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe({
      next: (places) => {
        this.nearbyPlaces = places.slice(0, 6);
      },
      error: (error) => {
        console.error('Failed to load places', error);
      },
    });
  }

  initial(name: string): string {
    return name.split(' ')[0]?.[0] ?? '';
  }
}
