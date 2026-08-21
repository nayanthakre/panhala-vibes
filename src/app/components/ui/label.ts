import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-label',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.for]': 'htmlFor() || null',
  },
  template: `<ng-content />`,
})
export class LabelComponent {
  readonly htmlFor = input('', { alias: 'for' });
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.className(),
    ),
  );
}
