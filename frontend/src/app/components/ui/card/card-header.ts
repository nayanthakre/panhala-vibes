import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card-header.html',

})
export class CardHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('flex flex-col space-y-1.5 p-6', this.className()));
}
