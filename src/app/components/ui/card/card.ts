import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card.html',

})
export class CardComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('rounded-xl border bg-card text-card-foreground shadow', this.className()),
  );
}
