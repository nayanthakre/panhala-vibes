import { Component, computed, inject, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { RadioGroupComponent } from './radio-group';

@Component({
  selector: 'ui-radio-group-item',
  standalone: true,
  templateUrl: './radio-group-item.html',

})
export class RadioGroupItemComponent {
  private readonly group = inject(RadioGroupComponent);

  readonly value = input.required<string>();
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });

  readonly checked = computed(() => this.group.value() === this.value());
  readonly classes = computed(() =>
    cn(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 grid place-content-center',
      this.className(),
    ),
  );

  activate(): void {
    if (!this.disabled()) this.group.select(this.value());
  }
}
