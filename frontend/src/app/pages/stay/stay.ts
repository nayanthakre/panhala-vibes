import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images, stays } from '@/app/lib/panhala-data';

@Component({
  selector: 'app-stay-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Stay"
        title="Stay Around Panhala"
        subtitle="Wake up inside the fort village, with valley mist at the window."
        [image]="images.stayHeritage"
        alt="Heritage hillside stay overlooking a green valley at dusk"
      >
        <a routerLink="/plan" class="btn-base btn-gold">✨ Plan My Panhala Day</a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            eyebrow="Places to stay"
            title="Handpicked stays"
            subtitle="From family homestays to full-service resorts on the ghat road."
          />
        </app-reveal>
        <div class="mt-10 grid gap-6">
          @for (s of stays; track s.name; let i = $index) {
            <app-reveal [delay]="i * 70">
              <article class="surface-card surface-card-hover group grid md:grid-cols-[320px_minmax(0,1fr)]">
                <div class="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                  <img
                    [src]="s.image"
                    [alt]="s.name"
                    loading="lazy"
                    width="1024"
                    height="768"
                    class="zoom-img h-full w-full object-cover"
                  />
                </div>
                <div class="grid gap-3 p-6">
                  <div class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div class="min-w-0">
                      <h2 class="text-display text-xl">{{ s.name }}</h2>
                      <p class="mt-1 text-sm text-muted-foreground">📍 {{ s.location }}</p>
                    </div>
                    <span class="badge-heritage shrink-0">⭐ {{ s.rating }}</span>
                  </div>
                  <p class="text-display text-lg text-forest">
                    {{ s.price }}
                    <span class="text-sm text-muted-foreground"> / night</span>
                  </p>
                  <p class="text-sm text-muted-foreground">{{ s.distance }}</p>
                  <ul class="flex flex-wrap gap-2">
                    @for (a of s.amenities; track a) {
                      <li
                        class="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground"
                      >
                        {{ a }}
                      </li>
                    }
                  </ul>
                  <a
                    [href]="mapsUrl(s.name)"
                    target="_blank"
                    rel="noreferrer noopener"
                    class="btn-base btn-outline w-full sm:w-auto sm:justify-self-start"
                  >
                    View Stay <span class="arrow">→</span>
                  </a>
                </div>
              </article>
            </app-reveal>
          }
        </div>
      </section>
    </main>
  `,
})
export class StayPage {
  readonly images = images;
  readonly stays = stays;

  mapsUrl(name: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Panhala')}`;
  }
}
