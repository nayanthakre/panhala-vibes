import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './dialog-footer.html',

})
export class DialogFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.className()),
  );
}
