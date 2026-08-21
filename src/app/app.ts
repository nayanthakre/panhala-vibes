import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  NavbarComponent,
  PageHeroComponent,
  PlaceCardComponent,
  RevealComponent,
  SectionHeadingComponent,
} from './components/site';
import { images, places } from './lib/panhala-data';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    PageHeroComponent,
    PlaceCardComponent,
    RevealComponent,
    SectionHeadingComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly images = images;
  readonly featuredPlaces = places.slice(0, 3);
}
