import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './tabs.html',

})
export class TabsComponent {
  readonly value = model('');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  select(value: string): void {
    this.value.set(value);
  }
}
