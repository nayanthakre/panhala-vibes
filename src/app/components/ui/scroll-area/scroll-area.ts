import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-scroll-area',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './scroll-area.html',

})
export class ScrollAreaComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('relative overflow-hidden', this.className()));
}
