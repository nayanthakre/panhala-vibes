import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-progress',
  standalone: true,
  host: {
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': '100',
    '[attr.aria-valuenow]': 'value()',
    '[class]': 'classes()',
  },
  template: `
    <div
      class="h-full w-full flex-1 bg-primary transition-all"
      [style.transform]="'translateX(-' + (100 - value()) + '%)'"
    ></div>
  `,
})
export class ProgressComponent {
  readonly value = input(0);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', this.className()),
  );
}
