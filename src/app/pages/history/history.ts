import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { history, images, people } from '@/app/lib/panhala-data';

const structures = [
  {
    title: 'Andhar Bavadi',
    copy: 'A concealed stepwell with guard chambers — a siege-proof water supply.',
  },
  {
    title: 'Teen Darwaza',
    copy: 'Three successive arches designed to trap and slow any attacking force.',
  },
  {
    title: 'Ambarkhana',
    copy: 'Vast granaries that could feed a garrison through a long blockade.',
  },
  {
    title: 'Sajja Kothi',
    copy: "A watch pavilion where the fort's most decisive nights were spent.",
  },
];

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealComponent, SectionHeadingComponent],
  template: `
    <main>
      <app-page-hero
        eyebrow="Since 1178"
        title="Stories Behind the Stones"
        subtitle="Walk through centuries of history — rulers, sieges, monsoons and the people who held this hill."
        [image]="images.andharBavadi"
        alt="Dark arched chambers of an ancient stepwell at Panhala"
      >
        <a routerLink="/explore" class="btn-base btn-gold">
          Visit these places <span class="arrow">→</span>
        </a>
      </app-page-hero>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading eyebrow="Timeline" title="Eight centuries on one hill" />
        </app-reveal>
        <div class="mt-10 overflow-x-auto pb-4">
          <ol class="flex min-w-max gap-6 border-t border-border pt-8">
            @for (h of history; track h.year) {
              <li class="relative w-[248px] shrink-0">
                <span class="absolute -top-[2.35rem] left-0 h-3 w-3 rounded-full bg-gold-gradient"></span>
                <p class="text-display text-2xl text-forest">{{ h.year }}</p>
                <h2 class="text-display mt-2 text-lg">{{ h.title }}</h2>
                <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ h.copy }}</p>
              </li>
            }
          </ol>
        </div>
      </section>

      <section class="bg-forest-gradient py-16 text-cream sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              tone="dark"
              eyebrow="Exhibition"
              title="People Who Shaped Panhala"
              subtitle="Rulers, commanders and reformers whose decisions still echo on this plateau."
            />
          </app-reveal>
          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            @for (p of people; track p.name; let i = $index) {
              <app-reveal [delay]="i * 70">
                <article
                  class="grid h-full grid-cols-[auto_minmax(0,1fr)] gap-5 rounded-2xl border border-cream/20 bg-forest-deep/30 p-6"
                >
                  <div
                    class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gold-gradient text-2xl text-forest-deep"
                  >
                    {{ initial(p.name) }}
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-display text-lg text-cream">{{ p.name }}</h3>
                    <p class="mt-1 text-xs font-bold uppercase tracking-widest text-gold-soft">
                      {{ p.role }}
                    </p>
                    <p class="mt-3 text-sm leading-relaxed text-sand/85">{{ p.copy }}</p>
                  </div>
                </article>
              </app-reveal>
            }
          </div>
        </div>
      </section>

      <section class="container-page py-16 sm:py-20">
        <app-reveal>
          <app-section-heading
            eyebrow="Architecture"
            title="Built for a siege"
            subtitle="How the fort's engineering answered water, food and defence."
          />
        </app-reveal>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          @for (s of structures; track s.title; let i = $index) {
            <app-reveal [delay]="i * 60">
              <div class="surface-card h-full p-5">
                <h3 class="text-display text-lg">{{ s.title }}</h3>
                <p class="mt-2 text-sm text-muted-foreground">{{ s.copy }}</p>
              </div>
            </app-reveal>
          }
        </div>
      </section>
    </main>
  `,
})
export class HistoryPage {
  readonly images = images;
  readonly history = history;
  readonly people = people;
  readonly structures = structures;

  initial(name: string): string {
    return name.split(' ')[0]?.[0] ?? '';
  }
}
