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
  template: `<ng-content />`,
})
export class BreadcrumbComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}

@Component({
  selector: 'ui-breadcrumb-list',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
  template: `<ng-content />`,
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

@Component({
  selector: 'ui-breadcrumb-item',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class BreadcrumbItemComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('inline-flex items-center gap-1.5', this.className()));
}

@Component({
  selector: 'ui-breadcrumb-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="href()" [class]="classes()">
      <ng-content />
    </a>
  `,
})
export class BreadcrumbLinkComponent {
  readonly href = input('/');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('transition-colors hover:text-foreground', this.className()),
  );
}

@Component({
  selector: 'ui-breadcrumb-page',
  standalone: true,
  host: {
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
    '[class]': 'classes()',
  },
  template: `<ng-content />`,
})
export class BreadcrumbPageComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('font-normal text-foreground', this.className()));
}

@Component({
  selector: 'ui-breadcrumb-separator',
  standalone: true,
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'classes()',
  },
  template: `
    <ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="h-3.5 w-3.5"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </ng-content>
  `,
})
export class BreadcrumbSeparatorComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&>svg]:h-3.5 [&>svg]:w-3.5', this.className()));
}
