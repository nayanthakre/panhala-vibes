import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-sheet-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './sheet-title.html',

})
export class SheetTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-lg font-semibold text-foreground', this.className()));
}
