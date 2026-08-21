import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-sheet-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './sheet-description.html',

})
export class SheetDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}
