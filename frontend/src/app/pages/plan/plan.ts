import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images, places, timeline } from '@/app/lib/panhala-data';

const tips = [
  {
    icon: '🌧️',
    title: 'Best season',
    copy: 'June–February. Monsoon for mist, winter for clear ridgelines.',
  },
  {
    icon: '🚗',
    title: 'Getting here',
    copy: 'About 22 km from Kolhapur — 45 minutes by road up the ghat.',
  },
  {
    icon: '👟',
    title: 'What to carry',
    copy: 'Grippy shoes, water, a light rain shell in monsoon.',
  },
  {
    icon: '⏱️',
    title: 'Time needed',
    copy: 'One full day covers the fort; two days include the trails.',
  },
];

@Component({
  selector: 'app-plan-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Itinerary"
        title="Plan Your Panhala Day"
        subtitle="Not sure where to start? Follow this route — it is how locals would show you the fort."
        [image]="images.sajjaKothi"
        alt="Arched stone pavilion at Panhala overlooking the valley"
      >
        <a href="#day-plan" class="btn-base btn-gold">✨ See the day plan</a>
        <a routerLink="/explore" class="btn-base btn-ghost-light">Browse places</a>
      </app-page-hero>

      <section id="day-plan" class="container-page scroll-mt-24 py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            align="center"
            eyebrow="Sunrise to dinner"
            title="A perfect day in Panhala"
            subtitle="Nine stops, no rush, plenty of chai."
          />
        </app-reveal>
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          @for (block of timeline; track block.part; let bi = $index) {
            <app-reveal [delay]="bi * 90">
              <div class="surface-card h-full p-6">
                <h2 class="text-display text-xl">{{ block.part }}</h2>
                <ol class="mt-5 grid gap-5">
                  @for (item of block.items; track item.time) {
                    <li class="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                      <div class="flex flex-col items-center">
                        <span class="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-gold-gradient"></span>
                        <span class="mt-1 w-px flex-1 bg-border"></span>
                      </div>
                      <div class="min-w-0 pb-1">
                        <p class="text-xs font-bold tracking-widest text-muted-foreground">
                          {{ item.time }}
                        </p>
                        <p class="text-display mt-1 text-lg">{{ item.title }}</p>
                        <p class="mt-1 text-sm text-muted-foreground">{{ item.note }}</p>
                      </div>
                    </li>
                  }
                </ol>
              </div>
            </app-reveal>
          }
        </div>
      </section>

      <section class="bg-sand-gradient py-16 sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading eyebrow="Good to know" title="Before you set out" />
          </app-reveal>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @for (t of tips; track t.title; let i = $index) {
              <app-reveal [delay]="i * 60">
                <div class="surface-card h-full p-5">
                  <span class="text-xl" aria-hidden="true">{{ t.icon }}</span>
                  <h3 class="text-display mt-3 text-lg">{{ t.title }}</h3>
                  <p class="mt-1 text-sm text-muted-foreground">{{ t.copy }}</p>
                </div>
              </app-reveal>
            }
          </div>
        </div>
      </section>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading eyebrow="Shortlist" title="Stops on this plan">
            <a routerLink="/map" class="btn-base btn-outline">
              Open map view <span class="arrow">→</span>
            </a>
          </app-section-heading>
        </app-reveal>
        <ul class="mt-8 grid gap-3 sm:grid-cols-2">
          @for (p of shortlist; track p.slug) {
            <li
              class="surface-card surface-card-hover grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5"
            >
              <div class="min-w-0">
                <p class="text-display truncate text-lg">{{ p.name }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ p.category }} · ⏱ {{ p.duration }}
                </p>
              </div>
              <span class="shrink-0 text-sm font-bold text-forest">{{ p.distance }}</span>
            </li>
          }
        </ul>
      </section>
    </main>
  `,
})
export class PlanPage {
  readonly images = images;
  readonly timeline = timeline;
  readonly tips = tips;
  readonly shortlist = places.slice(0, 6);
}
