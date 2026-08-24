import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: '',
})
export class SkeletonComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('animate-pulse rounded-md bg-primary/10', this.className()));
}
