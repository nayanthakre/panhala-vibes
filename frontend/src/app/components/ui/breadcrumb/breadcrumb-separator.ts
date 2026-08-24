import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb-separator',
  standalone: true,
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
  templateUrl: './breadcrumb-separator.html',

})
export class BreadcrumbSeparatorComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&>svg]:h-3.5 [&>svg]:w-3.5', this.className()));
}
