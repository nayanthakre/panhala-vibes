import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card-title.html',

})
export class CardTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('font-semibold leading-none tracking-tight', this.className()),
  );
}
