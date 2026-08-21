import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card-description.html',

})
export class CardDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}
