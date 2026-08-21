import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card-content',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card-content.html',

})
export class CardContentComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('p-6 pt-0', this.className()));
}
