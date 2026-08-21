import { Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

@Component({
  selector: 'ui-alert',
  standalone: true,
  host: {
    role: 'alert',
    '[class]': 'classes()',
  },
  template: `<ng-content />`,
})
export class AlertComponent {
  readonly variant = input<AlertVariant>('default');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(alertVariants({ variant: this.variant() }), this.className()));
}

@Component({
  selector: 'ui-alert-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AlertTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('mb-1 font-medium leading-none tracking-tight', this.className()),
  );
}

@Component({
  selector: 'ui-alert-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AlertDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm [&_p]:leading-relaxed', this.className()));
}
