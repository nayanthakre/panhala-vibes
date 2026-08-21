import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-sheet',
  standalone: true,
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50">
        <div class="fixed inset-0 bg-black/80" (click)="close()" aria-hidden="true"></div>
        <div role="dialog" aria-modal="true" [class]="panelClasses()">
          <button
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close"
            (click)="close()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class SheetComponent {
  readonly open = model(false);
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('right');
  readonly className = input('', { alias: 'class' });
  readonly openChange = output<boolean>();

  readonly panelClasses = computed(() => {
    const side = this.side();
    const sideClass =
      side === 'right'
        ? 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm'
        : side === 'left'
          ? 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm'
          : side === 'top'
            ? 'inset-x-0 top-0 border-b'
            : 'inset-x-0 bottom-0 border-t';

    return cn('fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out', sideClass, this.className());
  });

  close(): void {
    this.open.set(false);
    this.openChange.emit(false);
  }
}

@Component({
  selector: 'ui-sheet-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class SheetHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col space-y-2 text-center sm:text-left', this.className()),
  );
}

@Component({
  selector: 'ui-sheet-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class SheetTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-lg font-semibold text-foreground', this.className()));
}

@Component({
  selector: 'ui-sheet-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class SheetDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}
