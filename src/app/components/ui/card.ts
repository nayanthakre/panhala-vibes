import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('rounded-xl border bg-card text-card-foreground shadow', this.className()),
  );
}

@Component({
  selector: 'ui-card-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('flex flex-col space-y-1.5 p-6', this.className()));
}

@Component({
  selector: 'ui-card-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('font-semibold leading-none tracking-tight', this.className()),
  );
}

@Component({
  selector: 'ui-card-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}

@Component({
  selector: 'ui-card-content',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardContentComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('p-6 pt-0', this.className()));
}

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('flex items-center p-6 pt-0', this.className()));
}
