import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb-page',
  standalone: true,
  host: {
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
    '[class]': 'classes()',
  },
  templateUrl: './breadcrumb-page.html',

})
export class BreadcrumbPageComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('font-normal text-foreground', this.className()));
}
