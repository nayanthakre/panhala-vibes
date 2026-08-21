import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  templateUrl: './section-heading.html',

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
