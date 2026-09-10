import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { mapOrigin, type Place } from '@/app/lib/panhala-data';

const pinEmoji: Record<string, string> = {
  Historical: '🏰',
  Temple: '🕉️',
  'Fort Gate': '🚪',
  'Hidden Gem': '💎',
  Garden: '🌿',
  Viewpoint: '🌄',
  Nature: '🌲',
};

@Component({
  selector: 'app-places-map',
  standalone: true,
  imports: [LeafletDirective],
  template: `
    <div class="relative h-full min-h-[420px] w-full">
      @if (options; as mapOptions) {
        <div
          leaflet
          class="absolute inset-0 h-full w-full"
          [leafletOptions]="mapOptions"
          (leafletMapReady)="onMapReady($event)"
        ></div>
      } @else {
        <div class="grid h-full min-h-[420px] place-items-center bg-secondary text-sm text-muted-foreground">
          Loading map…
        </div>
      }
      <div class="absolute right-3 top-3 z-[500] flex flex-col items-end gap-2">
        <div class="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            class="btn-base btn-outline shadow-lift px-3.5 py-2 text-sm"
            (click)="expandToggle.emit()"
            [attr.aria-pressed]="expanded()"
            [attr.aria-label]="expanded() ? 'Exit expanded map' : 'Expand map'"
          >
            @if (expanded()) {
              Close map
            } @else {
              Expand map
            }
          </button>
          <button
            type="button"
            class="btn-base btn-primary shadow-lift px-3.5 py-2 text-sm"
            (click)="locateMe()"
            [disabled]="locateStatus() === 'locating'"
          >
            @if (locateStatus() === 'locating') {
              Finding you…
            } @else if (locateStatus() === 'found') {
              Recenter on me
            } @else {
              Show my location
            }
          </button>
          @if (locateStatus() === 'found') {
            <button
              type="button"
              class="btn-base btn-outline shadow-lift px-3.5 py-2 text-sm"
              (click)="hideLocation()"
            >
              Hide location
            </button>
          }
          @if (selectedPlace(); as place) {
            <button
              type="button"
              class="btn-base btn-gold shadow-lift px-3.5 py-2 text-sm"
              (click)="goToSelected()"
            >
              Go to {{ place.name }}
            </button>
          }
        </div>
        @if (locateMessage()) {
          <p
            class="max-w-[16rem] rounded-xl border border-border/70 bg-card/95 px-3 py-2 text-xs font-medium text-foreground shadow-soft"
            [class.text-destructive]="locateStatus() === 'denied' || locateStatus() === 'unavailable'"
          >
            {{ locateMessage() }}
          </p>
        }
      </div>
      <div class="absolute bottom-3 left-3 right-3 z-[500] flex flex-wrap items-end gap-2">
        <p
          class="rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur-sm"
        >
          @if (routing()) {
            Finding the road…
          } @else if (routeSummary()) {
            {{ routeSummary() }}
          } @else if (locateStatus() === 'found') {
            Open a pin, then tap Go to {{ selectedPlace()?.name || 'that place' }}
          } @else {
            Show my location, open a pin, then tap Go
          }
        </p>
        @if (routeSummary() && !routing()) {
          <button
            type="button"
            class="btn-base btn-outline shadow-lift px-3.5 py-2 text-sm"
            (click)="closeDirections()"
          >
            Close directions
          </button>
        }
      </div>
    </div>
  `,
  host: {
    class: 'block h-full w-full',
  },
})
export class PlacesMapComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly places = input.required<Place[]>();
  readonly selectedSlug = input<string | null>(null);
  readonly expanded = input(false);
  readonly goSlug = input<string | null>(null);
  readonly goToken = input(0);
  readonly placeSelect = output<string>();
  readonly userPosition = output<{ lat: number; lng: number; accuracy: number } | null>();
  readonly expandToggle = output<void>();

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly locateStatus = signal<'idle' | 'locating' | 'found' | 'denied' | 'unavailable'>('idle');
  readonly locateMessage = signal<string | null>(null);
  readonly routing = signal(false);
  readonly routeSummary = signal<string | null>(null);
  readonly selectedPlace = computed(
    () => this.places().find((p) => p.slug === this.selectedSlug()) ?? null,
  );
  options?: L.MapOptions;

  private map?: L.Map;
  private readonly markers = new Map<string, L.Marker>();
  private originMarker?: L.Marker;
  private userMarker?: L.Marker;
  private accuracyCircle?: L.Circle;
  private lastUserLatLng?: L.LatLng;
  private routeCasing?: L.Polyline;
  private routeLine?: L.Polyline;
  private routeAbort?: AbortController;
  private pendingRouteSlug: string | null = null;
  private watchId?: number;
  private skipNextFly = true;
  private shouldFlyToUser = false;

  constructor() {
    if (this.isBrowser) {
      this.options = {
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          }),
        ],
        zoom: 15,
        center: L.latLng(mapOrigin.lat, mapOrigin.lng),
        scrollWheelZoom: true,
      };
    }

    effect(() => {
      const slug = this.selectedSlug();
      this.highlight(slug);
      if (this.skipNextFly) return;
      if (slug) this.focusPlace(slug);
    });

    effect(() => {
      const token = this.goToken();
      const slug = this.goSlug();
      if (!token || !slug) return;
      queueMicrotask(() => {
        untracked(() => void this.routeToPlace(slug));
      });
    });

    effect(() => {
      this.expanded();
      const map = this.map;
      if (!map) return;
      queueMicrotask(() => map.invalidateSize());
      window.setTimeout(() => map.invalidateSize(), 280);
    });
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.addPins(map);
    this.fitAll(map);
    this.highlight(this.selectedSlug());
    this.bindMapClicks(map);

    const resize = () => map.invalidateSize();
    const timer = window.setTimeout(resize, 250);
    window.addEventListener('resize', resize);
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', resize);
      this.stopWatch();
      this.routeAbort?.abort();
    });

    void this.locateIfAlreadyGranted();
  }

  locateMe(): void {
    if (!this.isBrowser || !navigator.geolocation) {
      this.locateStatus.set('unavailable');
      this.locateMessage.set('This browser cannot share a location.');
      return;
    }

    this.shouldFlyToUser = true;

    if (this.userMarker && this.map) {
      const here = this.userMarker.getLatLng();
      this.map.flyTo(here, Math.max(this.map.getZoom(), 16), { duration: 0.8 });
      this.userMarker.openPopup();
      this.shouldFlyToUser = false;
      this.locateStatus.set('found');
      this.locateMessage.set(null);
      return;
    }

    this.locateStatus.set('locating');
    this.locateMessage.set('Allow location when the browser asks.');
    this.startWatch();
  }

  private async locateIfAlreadyGranted(): Promise<void> {
    if (!this.isBrowser || !navigator.geolocation || !navigator.permissions?.query) return;
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      if (permission.state === 'granted') this.startWatch();
    } catch {
      // Permissions API is optional; the button still works.
    }
  }

  private startWatch(): void {
    if (this.watchId != null) return;
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.onPosition(position),
      (error) => this.onGeoError(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10_000 },
    );
  }

  private stopWatch(): void {
    if (this.watchId == null) return;
    navigator.geolocation.clearWatch(this.watchId);
    this.watchId = undefined;
  }

  private onPosition(position: GeolocationPosition): void {
    const map = this.map;
    if (!map) return;

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const here = L.latLng(lat, lng);
    this.lastUserLatLng = here;

    if (!this.userMarker) {
      this.userMarker = L.marker(here, {
        icon: this.userIcon(),
        zIndexOffset: 600,
        title: 'You are here',
      }).addTo(map);
    } else {
      this.userMarker.setLatLng(here);
    }

    if (!this.accuracyCircle) {
      this.accuracyCircle = L.circle(here, {
        radius: accuracy,
        color: '#2563eb',
        weight: 1,
        fillColor: '#3b82f6',
        fillOpacity: 0.18,
      }).addTo(map);
    } else {
      this.accuracyCircle.setLatLng(here);
      this.accuracyCircle.setRadius(accuracy);
    }

    const km = this.kmToFort(lat, lng);
    this.userMarker.bindPopup(
      `<div class="panhala-popup">
        <p class="panhala-popup__cat">Live location</p>
        <h3>You are here</h3>
        <p>${km == null ? 'Location from this device.' : `${km} from Panhala Fort.`} Accuracy about ${Math.round(accuracy)} m.</p>
      </div>`,
    );

    this.locateStatus.set('found');
    this.locateMessage.set(null);
    this.userPosition.emit({ lat, lng, accuracy });

    if (this.pendingRouteSlug) {
      const slug = this.pendingRouteSlug;
      this.pendingRouteSlug = null;
      this.shouldFlyToUser = false;
      void this.routeToPlace(slug);
      return;
    }

    if (this.shouldFlyToUser) {
      this.shouldFlyToUser = false;
      map.flyTo(here, Math.max(map.getZoom(), 16), { duration: 0.8 });
      this.userMarker.openPopup();
      this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private onGeoError(error: GeolocationPositionError): void {
    this.stopWatch();
    this.pendingRouteSlug = null;
    this.routing.set(false);
    if (error.code === error.PERMISSION_DENIED) {
      this.locateStatus.set('denied');
      this.locateMessage.set('Location is blocked. Allow it in the browser address bar, then try again.');
      return;
    }
    this.locateStatus.set('unavailable');
    this.locateMessage.set(
      error.code === error.TIMEOUT
        ? 'Location timed out. Move near a window and try again.'
        : 'Could not find this device. Check that Location is on in Windows settings.',
    );
  }

  private kmToFort(lat: number, lng: number): string | null {
    const fort = this.places().find((p) => p.slug === 'panhala-fort') ?? this.places()[0];
    if (!fort) return null;
    const km = haversineKm(lat, lng, fort.lat, fort.lng);
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(km < 10 ? 1 : 0)} km`;
  }

  private userIcon(): L.DivIcon {
    return L.divIcon({
      className: 'panhala-marker panhala-user-marker',
      html: `<div class="you-are-here" aria-hidden="true"><span class="you-are-here__pulse"></span><span class="you-are-here__dot"></span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -12],
    });
  }

  private addPins(map: L.Map): void {
    this.originMarker = L.marker([mapOrigin.lat, mapOrigin.lng], {
      icon: this.divIcon('📍', true, false),
      zIndexOffset: 200,
      title: mapOrigin.name,
    }).addTo(map);
    this.originMarker.bindPopup(
      `<div class="panhala-popup">
        <p class="panhala-popup__cat">Start here</p>
        <h3>${mapOrigin.name}</h3>
        <p>Distances on this page are measured from the fort-village bus stand.</p>
      </div>`,
    );

    for (const place of this.places()) {
      const marker = L.marker([place.lat, place.lng], {
        icon: this.divIcon(pinEmoji[place.category] ?? '📍', false, false),
        title: place.name,
      }).addTo(map);

      marker.bindPopup(this.popupHtml(place));
      marker.on('click', () => {
        this.skipNextFly = true;
        this.placeSelect.emit(place.slug);
        queueMicrotask(() => {
          this.skipNextFly = false;
        });
      });
      this.markers.set(place.slug, marker);
    }

    this.skipNextFly = false;
  }

  private fitAll(map: L.Map): void {
    const points: L.LatLngExpression[] = [
      [mapOrigin.lat, mapOrigin.lng],
      ...this.places().map((p) => [p.lat, p.lng] as L.LatLngExpression),
    ];
    map.fitBounds(L.latLngBounds(points), { padding: [36, 36], maxZoom: 16 });
  }

  private highlight(slug: string | null): void {
    for (const [key, marker] of this.markers) {
      const place = this.places().find((p) => p.slug === key);
      const active = key === slug;
      marker.setIcon(this.divIcon(pinEmoji[place?.category ?? ''] ?? '📍', false, active));
      marker.setZIndexOffset(active ? 400 : 0);
    }
  }

  private focusPlace(slug: string): void {
    const marker = this.markers.get(slug);
    const map = this.map;
    if (!marker || !map) return;
    map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 16), { duration: 0.6 });
    marker.openPopup();
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  hideLocation(): void {
    this.stopWatch();
    this.userMarker?.remove();
    this.accuracyCircle?.remove();
    this.userMarker = undefined;
    this.accuracyCircle = undefined;
    this.lastUserLatLng = undefined;
    this.locateStatus.set('idle');
    this.locateMessage.set(null);
    this.userPosition.emit(null);
    this.closeDirections();
  }

  closeDirections(): void {
    this.routeAbort?.abort();
    this.pendingRouteSlug = null;
    this.routing.set(false);
    this.routeSummary.set(null);
    this.clearRoute();

    const slug = this.selectedSlug();
    const place = slug ? this.places().find((p) => p.slug === slug) : undefined;
    const marker = slug ? this.markers.get(slug) : undefined;
    if (place && marker) {
      marker.bindPopup(this.popupHtml(place));
    }
  }

  goToSelected(): void {
    const place = this.selectedPlace();
    if (place) void this.routeToPlace(place.slug);
  }

  private bindMapClicks(map: L.Map): void {
    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest) return;

      const go = target.closest('[data-go-slug]');
      if (go) {
        event.preventDefault();
        event.stopPropagation();
        const slug = go.getAttribute('data-go-slug');
        if (slug) void this.routeToPlace(slug);
        return;
      }

      const close = target.closest('[data-close-route]');
      if (close) {
        event.preventDefault();
        event.stopPropagation();
        this.closeDirections();
        map.closePopup();
      }
    };

    map.getContainer().addEventListener('click', onClick, true);
    this.destroyRef.onDestroy(() => {
      map.getContainer().removeEventListener('click', onClick, true);
    });
  }

  private async routeToPlace(slug: string): Promise<void> {
    const place = this.places().find((p) => p.slug === slug);
    const map = this.map;
    const marker = this.markers.get(slug);
    if (!place || !map) return;

    marker?.openPopup();

    const from = this.lastUserLatLng ?? this.userMarker?.getLatLng();
    if (!from) {
      this.pendingRouteSlug = slug;
      this.shouldFlyToUser = false;
      this.locateMessage.set('Allow location to draw the road from where you are.');
      if (this.locateStatus() !== 'locating') {
        this.locateStatus.set('locating');
      }
      this.startWatch();
      navigator.geolocation.getCurrentPosition(
        (position) => this.onPosition(position),
        (error) => this.onGeoError(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10_000 },
      );
      return;
    }

    this.pendingRouteSlug = null;
    this.routing.set(true);
    this.routeSummary.set(null);

    this.routeAbort?.abort();
    const abort = new AbortController();
    this.routeAbort = abort;

    const km = haversineKm(from.lat, from.lng, place.lat, place.lng);
    const profile: RouteProfile = km <= 4 ? 'foot' : 'driving';

    try {
      const route = await fetchOsrmRoute(from, L.latLng(place.lat, place.lng), profile, abort.signal);
      if (abort.signal.aborted) return;

      if (!route) {
        this.clearRoute();
        this.routing.set(false);
        this.routeSummary.set('Could not find a road. Try another pin.');
        return;
      }

      const latlngs = route.geometry.coordinates.map(([lng, lat]) => L.latLng(lat, lng));
      this.clearRoute();

      this.routeCasing = L.polyline(latlngs, {
        color: '#fff7e8',
        weight: 9,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);

      this.routeLine = L.polyline(latlngs, {
        color: '#2f6a45',
        weight: 5,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);

      const mode = profile === 'foot' ? 'walk' : 'drive';
      const summary = `${formatDistance(route.distance)} · ${formatDuration(route.duration)} ${mode}`;
      this.routeSummary.set(`You → ${place.name}: ${summary}`);
      this.routing.set(false);

      marker?.bindPopup(this.popupHtml(place, summary));
      marker?.openPopup();

      map.fitBounds(L.latLngBounds(latlngs), { padding: [48, 48], maxZoom: 17 });
      this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      this.routing.set(false);
      this.routeSummary.set('Could not find a road. Try another pin.');
    }
  }

  private clearRoute(): void {
    this.routeCasing?.remove();
    this.routeLine?.remove();
    this.routeCasing = undefined;
    this.routeLine = undefined;
  }

  private popupHtml(place: Place, routeLine?: string): string {
    const safeName = this.escape(place.name);
    const safeCat = this.escape(place.category);
    const safeCopy = this.escape(place.description);
    const extra = routeLine
      ? `<p class="panhala-popup__route">From you: ${this.escape(routeLine)}</p>`
      : '';
    const action = routeLine
      ? `<button type="button" class="panhala-go-btn panhala-go-btn--ghost" data-close-route>Close directions</button>`
      : `<button type="button" class="panhala-go-btn" data-go-slug="${place.slug}">Go</button>`;
    return `<div class="panhala-popup">
      <p class="panhala-popup__cat">${safeCat}</p>
      <h3>${safeName}</h3>
      <p>${safeCopy}</p>
      ${extra}
      <div class="panhala-popup-actions">
        ${action}
        <a href="/explore/${place.slug}">Explore</a>
      </div>
    </div>`;
  }

  private divIcon(emoji: string, origin: boolean, active: boolean): L.DivIcon {
    const kind = origin ? 'is-origin' : active ? 'is-active' : '';
    return L.divIcon({
      className: 'panhala-marker',
      html: `<div class="panhala-marker__pin ${kind}"><span>${emoji}</span></div>`,
      iconSize: [40, 48],
      iconAnchor: [20, 46],
      popupAnchor: [0, -40],
    });
  }

  private escape(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type RouteProfile = 'foot' | 'driving';

type OsrmRoute = {
  distance: number;
  duration: number;
  geometry: { coordinates: [number, number][] };
};

async function fetchOsrmRoute(
  from: L.LatLng,
  to: L.LatLng,
  profile: RouteProfile,
  signal: AbortSignal,
): Promise<OsrmRoute | null> {
  const path = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const urls =
    profile === 'foot'
      ? [
          `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${path}?overview=full&geometries=geojson`,
          `https://router.project-osrm.org/route/v1/foot/${path}?overview=full&geometries=geojson`,
          `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson`,
        ]
      : [
          `https://routing.openstreetmap.de/routed-car/route/v1/driving/${path}?overview=full&geometries=geojson`,
          `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson`,
        ];

  for (const url of urls) {
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) continue;
      const data = (await response.json()) as { code?: string; routes?: OsrmRoute[] };
      if (data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates?.length) {
        return data.routes[0];
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') throw error;
    }
  }
  return null;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(meters < 10000 ? 1 : 0)} km`;
}

function formatDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}
