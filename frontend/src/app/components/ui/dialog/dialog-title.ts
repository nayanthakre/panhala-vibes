import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './dialog-title.html',

})
export class DialogTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.className()),
  );
}
