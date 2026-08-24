import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-aspect-ratio',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[style.padding-bottom]': 'paddingBottom()',
  },
  templateUrl: './aspect-ratio.html',

})
export class AspectRatioComponent {
  readonly ratio = input(16 / 9);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('relative w-full', this.className()));
  readonly paddingBottom = computed(() => `${100 / this.ratio()}%`);
}
