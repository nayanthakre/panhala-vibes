import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb-item',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './breadcrumb-item.html',

})
export class BreadcrumbItemComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('inline-flex items-center gap-1.5', this.className()));
}
