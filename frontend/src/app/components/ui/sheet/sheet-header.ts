import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-sheet-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './sheet-header.html',

})
export class SheetHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col space-y-2 text-center sm:text-left', this.className()),
  );
}
