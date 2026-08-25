import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  PlaceCardComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images, natureSpots, places } from '@/app/lib/panhala-data';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    PlaceCardComponent,
    RevealComponent,
    SectionHeadingComponent,
  ],
  template: `
    <main>
      <app-page-hero
        eyebrow="Kolhapur • Maharashtra"
        title="Explore Panhala"
        subtitle="Discover more than just the fort — gateways, stepwells, temples, gardens and green ridges."
        [image]="images.teenDarwaza"
        alt="Three-arched stone gateway of Panhala Fort"
      >
        <a routerLink="/plan" class="btn-base btn-gold">✨ Plan My Panhala Day</a>
        <a routerLink="/map" class="btn-base btn-ghost-light">View Map</a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            eyebrow="All places"
            title="Curated fort locations"
            subtitle="Distances measured from Panhala bus stand."
          />
        </app-reveal>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (p of places; track p.slug; let i = $index) {
            <app-reveal [delay]="i * 60">
              <div [id]="p.slug" class="scroll-mt-28">
                <app-place-card [place]="p" />
              </div>
            </app-reveal>
          }
        </div>
      </section>

      <section class="bg-sand-gradient py-16 sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              eyebrow="Nature"
              title="Green routes worth the walk"
              subtitle="Walk through the green side of history."
            />
          </app-reveal>
          <div class="mt-8 sm:mt-10 grid gap-6">
            @for (n of natureSpots; track n.tag; let i = $index) {
              <app-reveal [delay]="i * 70">
                <article
                  class="group relative isolate flex min-h-[340px] sm:min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft transition-all duration-300"
                >
                  <img
                    [src]="n.image || (n.images && n.images[0]) || images.natureTrail"
                    [alt]="n.title"
                    loading="lazy"
                    width="1600"
                    height="900"
                    class="zoom-img absolute inset-0 -z-20 h-full w-full object-cover"
                  />
                  <div class="image-overlay absolute inset-0 -z-10"></div>
                  <div class="relative z-10 flex flex-col items-start">
                    <p class="eyebrow text-gold-soft">{{ n.tag }}</p>
                    <h3 class="text-display mt-2 max-w-xl text-2xl text-cream sm:text-3xl">
                      {{ n.title }}
                    </h3>
                    <p class="mt-2 max-w-lg text-sm text-sand/90 sm:text-base leading-relaxed">
                      {{ n.copy }}
                    </p>
                  </div>
                </article>
              </app-reveal>
            }
          </div>
        </div>
      </section>
    </main>
  `,
})
export class ExplorePage {
  readonly images = images;
  readonly places = places;
  readonly natureSpots = natureSpots;
}
