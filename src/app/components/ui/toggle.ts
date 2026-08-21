import { Component, computed, input, model, output } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3 min-w-9',
        sm: 'h-8 px-2 min-w-8',
        lg: 'h-10 px-3 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>['variant']>;
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>['size']>;

@Component({
  selector: 'ui-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      [attr.aria-pressed]="pressed()"
      [attr.data-state]="pressed() ? 'on' : 'off'"
      [disabled]="disabled()"
      [class]="classes()"
      (click)="toggle()"
    >
      <ng-content />
    </button>
  `,
})
export class ToggleComponent {
  readonly pressed = model(false);
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });
  readonly pressedChange = output<boolean>();

  readonly classes = computed(() =>
    cn(toggleVariants({ variant: this.variant(), size: this.size() }), this.className()),
  );

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.pressed();
    this.pressed.set(next);
    this.pressedChange.emit(next);
  }
}
