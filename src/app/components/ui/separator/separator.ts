import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-separator',
  standalone: true,
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'classes()',
  },
  template: '',
})
export class SeparatorComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly className = input('', { alias: 'class' });

  readonly classes = computed(() =>
    cn(
      'shrink-0 bg-border',
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      this.className(),
    ),
  );
}
