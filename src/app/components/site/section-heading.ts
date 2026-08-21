import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div [class]="gridClasses()">
      <div class="min-w-0 max-w-2xl">
        @if (eyebrow()) {
          <p [class]="tone() === 'dark' ? 'eyebrow text-gold-soft' : 'eyebrow'">
            {{ eyebrow() }}
          </p>
        }
        <h2 [class]="titleClasses()">{{ title() }}</h2>
        @if (subtitle()) {
          <p [class]="subtitleClasses()">{{ subtitle() }}</p>
        }
      </div>
      <div class="shrink-0">
        <ng-content />
      </div>
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly align = input<'left' | 'center'>('left');
  readonly tone = input<'light' | 'dark'>('light');

  readonly gridClasses = computed(() =>
    cn(
      'grid gap-4',
      this.align() === 'center'
        ? 'justify-items-center text-center'
        : 'sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end',
    ),
  );

  readonly titleClasses = computed(() =>
    cn(
      'text-display mt-3 text-3xl sm:text-4xl lg:text-[2.75rem]',
      this.tone() === 'dark' ? 'text-cream' : 'text-foreground',
    ),
  );

  readonly subtitleClasses = computed(() =>
    cn(
      'mt-3 text-base leading-relaxed',
      this.tone() === 'dark' ? 'text-sand/85' : 'text-muted-foreground',
    ),
  );
}
