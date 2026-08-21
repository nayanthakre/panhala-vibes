import { Component, computed, inject, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  host: {
    role: 'radiogroup',
    '[class]': 'classes()',
  },
  template: `<ng-content />`,
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

@Component({
  selector: 'ui-radio-group-item',
  standalone: true,
  template: `
    <button
      type="button"
      role="radio"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class]="classes()"
      (click)="activate()"
    >
      @if (checked()) {
        <span class="h-2 w-2 rounded-full bg-primary"></span>
      }
    </button>
  `,
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
