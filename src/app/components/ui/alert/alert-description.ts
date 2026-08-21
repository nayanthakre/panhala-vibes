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
  selector: 'ui-alert-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './alert-description.html',

})
export class AlertDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm [&_p]:leading-relaxed', this.className()));
}
