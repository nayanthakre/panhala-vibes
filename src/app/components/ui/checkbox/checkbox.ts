import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  templateUrl: './checkbox.html',

})
export class CheckboxComponent {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });
  readonly checkedChange = output<boolean>();

  readonly classes = computed(() =>
    cn(
      'grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() && 'bg-primary text-primary-foreground',
      this.className(),
    ),
  );

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.checked();
    this.checked.set(next);
    this.checkedChange.emit(next);
  }
}
