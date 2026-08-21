import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb-list',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
  templateUrl: './breadcrumb-list.html',

})
export class BreadcrumbListComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      this.className(),
    ),
  );
}
