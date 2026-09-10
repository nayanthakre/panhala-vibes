import { isPlatformBrowser } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images, mapOrigin, places, type Place } from '@/app/lib/panhala-data';
import { cn } from '@/app/lib/utils';
import { PlacesMapComponent } from './places-map';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    RevealComponent,
    SectionHeadingComponent,
    PlacesMapComponent,
  ],
  template: `
    <main>
      <app-page-hero
        eyebrow="Nearby"
        title="Find Your Way Around"
        subtitle="Every place named on this site is pinned at its real location on the fort plateau."
        [image]="images.sunsetPoint"
        alt="Sahyadri ridges at sunset seen from Panhala Fort"
      >
        <a
          [href]="mapsUrl(fort)"
          target="_blank"
          rel="noreferrer noopener"
          class="btn-base btn-gold"
        >
          Get Directions <span class="arrow">→</span>
        </a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-section-heading
          eyebrow="Live map"
          title="Pinned places of Panhala"
          subtitle="Open a pin and tap Go to draw the road from you. Close directions when you are done, or Hide location to remove the blue dot."
        />

        <div [class]="mapShellClass()">
          @defer (when isBrowser) {
            <app-places-map
              class="block h-full min-h-[420px] w-full"
              [places]="places"
              [selectedSlug]="selectedSlug()"
              [expanded]="mapExpanded()"
              [goSlug]="goSlug()"
              [goToken]="goToken()"
              (placeSelect)="selectPlace($event)"
              (userPosition)="onUserPosition($event)"
              (expandToggle)="toggleMapExpand()"
            />
          } @placeholder {
            <div
              class="grid h-full min-h-[420px] place-items-center bg-secondary text-sm text-muted-foreground"
            >
              Loading map…
            </div>
          }
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <app-reveal>
            <div class="surface-card p-6 sm:p-8">
              <div class="grid gap-4">
                <div class="flex items-center gap-3">
                  <span class="grid h-10 w-10 place-items-center rounded-xl bg-secondary">📍</span>
                  <div class="min-w-0">
                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Current location
                    </p>
                    <p class="truncate font-semibold">{{ currentLabel() }}</p>
                  </div>
                </div>
                <div class="ml-5 h-8 w-px bg-border"></div>
                <div class="flex items-center gap-3">
                  <span
                    class="grid h-10 w-10 place-items-center rounded-xl bg-forest-gradient text-cream"
                  >
                    🏰
                  </span>
                  <div class="min-w-0">
                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Destination
                    </p>
                    <p class="truncate font-semibold">{{ fort.name }}</p>
                  </div>
                </div>
              </div>
              <dl class="mt-8 grid grid-cols-2 gap-4">
                <div class="rounded-2xl bg-secondary p-4">
                  <dt class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Distance
                  </dt>
                  <dd class="text-display mt-1 text-2xl">{{ distanceLabel() }}</dd>
                </div>
                <div class="rounded-2xl bg-secondary p-4">
                  <dt class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Est. travel
                  </dt>
                  <dd class="text-display mt-1 text-2xl">{{ travelLabel() }}</dd>
                </div>
              </dl>
              <a routerLink="/plan" class="btn-base btn-outline mt-6 w-full">
                Plan around these stops <span class="arrow">→</span>
              </a>
            </div>
          </app-reveal>

          <app-reveal [delay]="100">
            <div class="surface-card p-6 sm:p-8">
              <app-section-heading eyebrow="All stops" title="Nearby places" />
              <ul class="mt-6 grid gap-3">
                @for (p of places; track p.slug) {
                  <li>
                    <div
                      class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3 transition-colors"
                      [class.border-forest]="selectedSlug() === p.slug"
                      [class.bg-secondary]="selectedSlug() === p.slug"
                      [class.border-border]="selectedSlug() !== p.slug"
                    >
                      <button
                        type="button"
                        class="min-w-0 text-left"
                        (click)="selectPlace(p.slug)"
                        [attr.aria-pressed]="selectedSlug() === p.slug"
                        [attr.aria-label]="'Show ' + p.name + ' on the map'"
                      >
                        <p class="truncate font-semibold">{{ p.name }}</p>
                        <p class="text-xs text-muted-foreground">
                          {{ p.category }} · ⏱ {{ p.duration }}
                        </p>
                      </button>
                      <div class="flex shrink-0 items-center gap-2">
                        <span class="hidden text-sm font-bold text-forest sm:inline">{{ p.distance }}</span>
                        <button
                          type="button"
                          class="btn-base btn-primary px-3 py-2 text-xs"
                          (click)="goToPlace(p.slug)"
                          [attr.aria-label]="'Go to ' + p.name"
                        >
                          Go
                        </button>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </app-reveal>
        </div>
      </section>
    </main>
  `,
})
export class MapPage implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly images = images;
  readonly places = places;
  readonly origin = mapOrigin;
  readonly fort = places[0];
  readonly selectedSlug = signal<string | null>(null);
  readonly userPosition = signal<{ lat: number; lng: number; accuracy: number } | null>(null);
  readonly mapExpanded = signal(false);
  readonly goSlug = signal<string | null>(null);
  readonly goToken = signal(0);

  readonly mapShellClass = computed(() =>
    cn(
      'overflow-hidden bg-background',
      this.mapExpanded()
        ? 'fixed inset-0 z-[80] h-dvh w-full'
        : 'mt-8 h-[min(70vh,640px)] min-h-[420px] rounded-2xl border border-border shadow-soft sm:rounded-3xl',
    ),
  );

  readonly currentLabel = computed(() =>
    this.userPosition() ? 'You (this device)' : this.origin.name,
  );

  readonly distanceLabel = computed(() => {
    const km = this.kmFromUserToFort();
    if (km == null) return this.fort.distance;
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(km < 10 ? 1 : 0)} km`;
  });

  readonly travelLabel = computed(() => {
    const km = this.kmFromUserToFort();
    if (km == null) return '8 min';
    if (km < 0.08) return 'here';
    const minutes = km < 3 ? Math.max(1, Math.round((km / 5) * 60)) : Math.max(8, Math.round((km / 30) * 60));
    return `${minutes} min`;
  });

  ngOnInit(): void {
    if (!this.isBrowser) return;

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.key === 'Escape' && this.mapExpanded()) {
          this.mapExpanded.set(false);
          this.setBodyLocked(false);
        }
      });

    this.destroyRef.onDestroy(() => this.setBodyLocked(false));
  }

  toggleMapExpand(): void {
    const next = !this.mapExpanded();
    this.mapExpanded.set(next);
    this.setBodyLocked(next);
  }

  selectPlace(slug: string): void {
    this.selectedSlug.set(slug);
  }

  goToPlace(slug: string): void {
    this.selectedSlug.set(slug);
    this.goSlug.set(slug);
    this.goToken.update((n) => n + 1);
  }

  onUserPosition(position: { lat: number; lng: number; accuracy: number } | null): void {
    this.userPosition.set(position);
  }

  mapsUrl(place: Pick<Place, 'lat' | 'lng'>): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  }

  private kmFromUserToFort(): number | null {
    const pos = this.userPosition();
    if (!pos) return null;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(this.fort.lat - pos.lat);
    const dLng = toRad(this.fort.lng - pos.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(pos.lat)) * Math.cos(toRad(this.fort.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private setBodyLocked(locked: boolean): void {
    if (!this.isBrowser) return;
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
