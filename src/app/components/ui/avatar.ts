import { Component, computed, input, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AvatarComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', this.className()),
  );
}

@Component({
  selector: 'ui-avatar-image',
  standalone: true,
  template: `
    @if (!failed()) {
      <img
        [src]="src()"
        [alt]="alt()"
        [class]="classes()"
        (error)="failed.set(true)"
      />
    }
  `,
})
export class AvatarImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly className = input('', { alias: 'class' });
  readonly failed = signal(false);
  readonly classes = computed(() => cn('aspect-square h-full w-full', this.className()));
}

@Component({
  selector: 'ui-avatar-fallback',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AvatarFallbackComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex h-full w-full items-center justify-center rounded-full bg-muted', this.className()),
  );
}
