import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-input',
  standalone: true,
  template: `
    <input
      [attr.type]="type()"
      [attr.placeholder]="placeholder() || null"
      [disabled]="disabled()"
      [attr.value]="value() || null"
      [class]="classes()"
    />
  `,
})
export class InputComponent {
  readonly type = input('text');
  readonly placeholder = input('');
  readonly value = input('');
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });

  readonly classes = computed(() =>
    cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.className(),
    ),
  );
}
