import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images, places } from '@/app/lib/panhala-data';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Nearby"
        title="Find Your Way Around"
        subtitle="Distances measured from Panhala bus stand — most of the fort is a comfortable walk."
        [image]="images.sunsetPoint"
        alt="Sahyadri ridges at sunset seen from Panhala Fort"
      >
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Panhala+Fort,+Kolhapur"
          target="_blank"
          rel="noreferrer noopener"
          class="btn-base btn-gold"
        >
          Get Directions <span class="arrow">→</span>
        </a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <div class="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <app-reveal>
            <div class="surface-card p-6 sm:p-8">
              <div class="grid gap-4">
                <div class="flex items-center gap-3">
                  <span class="grid h-10 w-10 place-items-center rounded-xl bg-secondary">📍</span>
                  <div class="min-w-0">
                    <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Current location
                    </p>
                    <p class="truncate font-semibold">Panhala Bus Stand</p>
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
                    <p class="truncate font-semibold">Panhala Fort</p>
                  </div>
                </div>
              </div>
              <dl class="mt-8 grid grid-cols-2 gap-4">
                <div class="rounded-2xl bg-secondary p-4">
                  <dt class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Distance
                  </dt>
                  <dd class="text-display mt-1 text-2xl">2.4 km</dd>
                </div>
                <div class="rounded-2xl bg-secondary p-4">
                  <dt class="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Est. travel
                  </dt>
                  <dd class="text-display mt-1 text-2xl">8 min</dd>
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
                  <li
                    class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3"
                  >
                    <div class="min-w-0">
                      <p class="truncate font-semibold">{{ p.name }}</p>
                      <p class="text-xs text-muted-foreground">
                        {{ p.category }} · ⏱ {{ p.duration }}
                      </p>
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
export class MapPage {
  readonly images = images;
  readonly places = places;

  mapsUrl(name: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Panhala')}`;
  }
}
