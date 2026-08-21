import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { foods, images } from '@/app/lib/panhala-data';

const dishes = [
  {
    name: 'Kolhapuri Misal',
    copy: 'Sprouts, fiery kat and farsan — the local breakfast of record.',
  },
  {
    name: 'Tambda & Pandhra Rassa',
    copy: 'Two legendary mutton curries, one red and one white.',
  },
  {
    name: 'Jowar Bhakri',
    copy: 'Hand-patted millet bread, straight off the iron griddle.',
  },
  {
    name: 'Kolhapuri Thali',
    copy: 'Rassa, bhaji, bhakri, rice, koshimbir and jaggery to finish.',
  },
];

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Food"
        title="Taste Panhala"
        subtitle="Eat where the fort village eats — spice, jaggery and slow cooking on the hilltop."
        [image]="images.foodThali"
        alt="Maharashtrian thali served on a brass plate"
      >
        <a routerLink="/plan" class="btn-base btn-gold">✨ Add food stops to my day</a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            eyebrow="Where to eat"
            title="Local kitchens & chai corners"
            subtitle="Small places, big flavour — most are a short walk from the fort."
          />
        </app-reveal>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (f of foods; track f.name; let i = $index) {
            <app-reveal [delay]="i * 70">
              <article class="surface-card surface-card-hover group flex h-full flex-col">
                <div class="relative aspect-[4/3] overflow-hidden">
                  <img
                    [src]="f.image"
                    [alt]="f.dish + ' at ' + f.name"
                    loading="lazy"
                    width="1024"
                    height="768"
                    class="zoom-img h-full w-full object-cover"
                  />
                  <span class="badge-heritage absolute left-4 top-4">{{ f.cuisine }}</span>
                </div>
                <div class="flex flex-1 flex-col gap-2 p-5">
                  <h2 class="text-display text-xl">{{ f.name }}</h2>
                  <p class="text-sm text-muted-foreground">Known for {{ f.dish }}</p>
                  <div
                    class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-4 text-xs font-semibold text-muted-foreground"
                  >
                    <span>⭐ {{ f.rating }}</span>
                    <span>{{ f.price }}</span>
                    <span>📍 {{ f.distance }}</span>
                  </div>
                  <a
                    [href]="mapsUrl(f.name)"
                    target="_blank"
                    rel="noreferrer noopener"
                    class="btn-base btn-outline"
                  >
                    View Place <span class="arrow">→</span>
                  </a>
                </div>
              </article>
            </app-reveal>
          }
        </div>
      </section>

      <section class="bg-forest-gradient py-16 text-cream sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              tone="dark"
              eyebrow="Order this"
              title="Four things you should not leave without"
            />
          </app-reveal>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            @for (d of dishes; track d.name; let i = $index) {
              <app-reveal [delay]="i * 60">
                <div class="rounded-2xl border border-cream/20 bg-forest-deep/30 p-5">
                  <h3 class="text-display text-lg text-gold-soft">{{ d.name }}</h3>
                  <p class="mt-2 text-sm text-sand/85">{{ d.copy }}</p>
                </div>
              </app-reveal>
            }
          </div>
        </div>
      </section>
    </main>
  `,
})
export class FoodPage {
  readonly images = images;
  readonly foods = foods;
  readonly dishes = dishes;

  mapsUrl(name: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Panhala')}`;
  }
}
