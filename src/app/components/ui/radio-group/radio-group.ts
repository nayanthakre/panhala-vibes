import { Component, computed, inject, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  host: {
    role: 'radiogroup',
    '[class]': 'classes()',
  },
  templateUrl: './radio-group.html',

})
export class RadioGroupComponent {
  readonly value = model('');
  readonly className = input('', { alias: 'class' });
  readonly valueChange = output<string>();
  readonly classes = computed(() => cn('grid gap-2', this.className()));

  select(value: string): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
