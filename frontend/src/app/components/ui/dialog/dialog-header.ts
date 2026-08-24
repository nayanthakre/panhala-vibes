import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './dialog-header.html',

})
export class DialogHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col space-y-1.5 text-center sm:text-left', this.className()),
  );
}
