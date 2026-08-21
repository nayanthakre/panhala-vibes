import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { culture, images, shops } from '@/app/lib/panhala-data';

@Component({
  selector: 'app-local-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Culture"
        title="Discover Local Panhala"
        subtitle="Behind the ramparts is a working hill town — its bazaars, workshops and kitchens."
        [image]="images.localMarket"
        alt="Local market stall in Panhala with wooden crafts and traditional products"
      >
        <a routerLink="/food" class="btn-base btn-gold">
          Taste Panhala <span class="arrow">→</span>
        </a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            eyebrow="Everyday Panhala"
            title="What locals will point you to"
            subtitle="Seven ways to meet the town rather than just its monuments."
          />
        </app-reveal>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (c of culture; track c.title; let i = $index) {
            <app-reveal [delay]="i * 50">
              <div class="surface-card surface-card-hover flex h-full items-start gap-4 p-5">
                <span
                  class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-lg"
                >
                  {{ c.icon }}
                </span>
                <div class="min-w-0">
                  <h2 class="text-display text-lg">{{ c.title }}</h2>
                  <p class="mt-1 text-sm text-muted-foreground">{{ c.copy }}</p>
                </div>
              </div>
            </app-reveal>
          }
        </div>
      </section>

      <section class="bg-sand-gradient py-16 sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              eyebrow="Marketplace"
              title="Take a Piece of Panhala Home"
              subtitle="Old bookshops, hand-turned wood, jaggery and crafts made a few hills away."
            />
          </app-reveal>
          <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (s of shops; track s.title; let i = $index) {
              <app-reveal [delay]="i * 50">
                <div class="surface-card surface-card-hover flex h-full gap-3 p-5">
                  <span class="text-lg" aria-hidden="true">{{ s.icon }}</span>
                  <div class="min-w-0">
                    <h3 class="text-display text-lg">{{ s.title }}</h3>
                    <p class="mt-1 text-sm text-muted-foreground">{{ s.copy }}</p>
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
export class LocalPage {
  readonly images = images;
  readonly culture = culture;
  readonly shops = shops;
}
