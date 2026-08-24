import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Place } from '@/app/lib/panhala-data';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'https://panhala-vibes-backend.onrender.com';
  private readonly placesUrl = `${this.apiBaseUrl}/api/places`;

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl);
  }
}
