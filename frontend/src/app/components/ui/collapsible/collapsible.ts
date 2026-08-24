import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './collapsible.html',

})
export class CollapsibleComponent {
  readonly open = model(false);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  toggle(): void {
    this.open.update((v) => !v);
  }
}
