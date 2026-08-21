import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-switch',
  standalone: true,
  templateUrl: './switch.html',

})
export class SwitchComponent {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });
  readonly checkedChange = output<boolean>();

  readonly classes = computed(() =>
    cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() ? 'bg-primary' : 'bg-input',
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
