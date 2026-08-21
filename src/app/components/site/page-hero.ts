import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
    <section class="relative isolate -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      <img
        [src]="image()"
        [alt]="alt()"
        width="1600"
        height="900"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="image-overlay absolute inset-0"></div>
      <div class="container-page relative py-24 sm:py-28">
        <p class="eyebrow text-gold-soft">{{ eyebrow() }}</p>
        <h1 class="text-display mt-3 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
          {{ title() }}
        </h1>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-sand/90 sm:text-lg">
          {{ subtitle() }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <ng-content />
        </div>
      </div>
    </section>
  `,
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
}
