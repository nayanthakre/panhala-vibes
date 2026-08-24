import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-breadcrumb-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb-link.html',

})
export class BreadcrumbLinkComponent {
  readonly href = input('/');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('transition-colors hover:text-foreground', this.className()),
  );
}
