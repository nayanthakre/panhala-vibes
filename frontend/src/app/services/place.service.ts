import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Place } from '@/app/lib/panhala-data';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/places';

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }
}
