import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent, RevealComponent, SectionHeadingComponent } from '@/app/components/site';
import { images, places } from '@/app/lib/panhala-data';
import { mapPoints, type MapPoint } from '@/app/lib/map-points';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Nearby"
        title="Map Points"
        subtitle="Explore the main places on the map with small pins, quick descriptions and direct navigation."
        [image]="images.sunsetPoint"
        alt="Sahyadri ridges at sunset seen from Panhala Fort"
      >
        <a routerLink="/explore" class="btn-base btn-gold">Explore Places <span class="arrow">→</span></a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <div class="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <app-reveal>
            <div class="surface-card p-6 sm:p-8">
              <app-section-heading
                eyebrow="Map"
                title="Small pins, clear places"
                subtitle="The map shows each point with a compact pin icon."
              />

              <div class="mt-6 rounded-2xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
                Click any point card below to open Google Maps navigation from your current location.
              </div>

              <a routerLink="/plan" class="btn-base btn-outline mt-6 w-full">
                Plan around these stops <span class="arrow">→</span>
              </a>
            </div>
          </app-reveal>

          <app-reveal [delay]="100">
            <div class="surface-card overflow-hidden">
              <div class="border-b border-border bg-background/90 px-5 py-4">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="eyebrow">Map view</p>
                    <p class="text-sm text-muted-foreground">All points displayed as small pins</p>
                  </div>
                  <span class="badge-heritage">Live map</span>
                </div>
              </div>
              <div class="relative">
                <div #mapEl class="h-[420px] w-full sm:h-[560px]"></div>
              </div>
            </div>
          </app-reveal>
        </div>
      </section>

      <section class="container-page pb-16 sm:pb-20">
        <app-reveal>
          <app-section-heading
            eyebrow="Points"
            title="Places on the map"
            subtitle="Each card shows a short description and one image. Use Go to start navigation from your location."
          />
        </app-reveal>
        <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          @for (option of placeOptions; track option.name) {
            <app-reveal>
              <article class="surface-card overflow-hidden">
                <img
                  [src]="option.image"
                  [alt]="option.label"
                  width="800"
                  height="500"
                  class="h-48 w-full object-cover"
                />
                <div class="p-5">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <h3 class="text-display text-xl text-foreground">{{ option.label }}</h3>
                      <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {{ option.description }}
                      </p>
                    </div>
                    <span class="badge-heritage shrink-0">Point</span>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      class="btn-base btn-gold px-3 py-2 text-xs"
                      (click)="goToPoint(option.name)"
                    >
                      Go <span class="arrow">→</span>
                    </button>
                  </div>
                </div>
              </article>
            </app-reveal>
          }
        </div>
      </section>

      <section class="bg-sand-gradient py-16 sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              eyebrow="All stops"
              title="Nearby places"
              subtitle="Tap any place to open directions in Google Maps."
            />
          </app-reveal>
          <div class="mt-10 grid gap-3">
            @for (p of places; track p.slug) {
              <app-reveal>
                <div
                  class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-4"
                >
                  <div class="min-w-0">
                    <p class="truncate font-semibold text-foreground">{{ p.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ p.category }} · ⏱ {{ p.duration }}</p>
                  </div>
                  <div class="flex shrink-0 items-center gap-3">
                    <span class="text-sm font-bold text-forest">{{ p.distance }}</span>
                    <a
                      [href]="mapsUrl(p.name)"
                      target="_blank"
                      rel="noreferrer noopener"
                      [attr.aria-label]="'Directions to ' + p.name"
                      class="btn-base btn-outline px-3 py-2 text-xs"
                    >
                      Directions <span class="arrow">→</span>
                    </a>
                  </div>
                </div>
              </app-reveal>
            }
          </div>
        </div>
      </section>
    </main>
  `,
})
export class MapPage implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('mapEl', { static: false }) private readonly mapEl?: ElementRef<HTMLDivElement>;

  readonly images = images;
  readonly places = places;
  readonly placeOptions: MapPoint[] = mapPoints;
  readonly activePoint = signal<MapPoint | null>(mapPoints[0] ?? null);

  private map?: any;
  private maplibre?: typeof import('maplibre-gl');
  private activePopup?: any;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.mapEl) return;

    this.maplibre = await import('maplibre-gl');
    const maplibre = this.maplibre;
    if (!maplibre) return;

    const style: import('maplibre-gl').StyleSpecification = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm',
        },
      ],
    };

    this.map = new maplibre.Map({
      container: this.mapEl.nativeElement,
      style,
      center: [74.115, 16.812],
      zoom: 13,
    });

    this.map.addControl(new maplibre.NavigationControl({ visualizePitch: true }), 'top-right');

    const bounds = new maplibre.LngLatBounds();
    this.placeOptions.forEach((point) => {
      bounds.extend([point.coords[1], point.coords[0]]);

      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'mapbox-pin';
      el.setAttribute('aria-label', point.label);
      el.innerHTML = `
        <span class="mapbox-pin-dot"></span>
        <span class="mapbox-pin-label">${point.label}</span>
      `;

      el.addEventListener('click', () => this.openPointPopup(point));

      new maplibre.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat([point.coords[1], point.coords[0]])
        .addTo(this.map);
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
    }

    if (this.placeOptions[0]) {
      this.openPointPopup(this.placeOptions[0]);
    }
  }

  mapsUrl(name: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Panhala')}`;
  }

  goToPoint(name: string): void {
    const point = this.getPlace(name);
    if (!point) return;

    const destination = `${point.coords[0]},${point.coords[1]}`;

    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = `${position.coords.latitude},${position.coords.longitude}`;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
            '_blank',
            'noopener,noreferrer',
          );
        },
        () => {
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`,
            '_blank',
            'noopener,noreferrer',
          );
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
      );
      return;
    }

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  private getPlace(name: string): MapPoint | undefined {
    return this.placeOptions.find((place) => place.name === name);
  }

  private openPointPopup(point: MapPoint): void {
    if (!this.map) return;

    this.activePoint.set(point);
    this.activePopup?.remove();
    if (!this.maplibre) return;

    this.activePopup = new this.maplibre.Popup({ offset: 18, closeButton: false, closeOnClick: true })
      .setLngLat([point.coords[1], point.coords[0]])
      .setHTML(
        `
          <div style="max-width: 220px">
            <div style="font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #1f6b43;">${point.label}</div>
            <div style="margin-top: 6px; font-size: 13px; line-height: 1.5; color: #475569;">${point.description}</div>
          </div>
        `,
      )
      .addTo(this.map);
  }
}
