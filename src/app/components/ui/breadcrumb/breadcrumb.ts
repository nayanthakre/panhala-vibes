import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  host: {
    role: 'navigation',
    'aria-label': 'breadcrumb',
    '[class]': 'classes()',
  },
  templateUrl: './breadcrumb.html',

})
export class BreadcrumbComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}
