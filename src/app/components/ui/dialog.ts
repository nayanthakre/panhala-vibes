import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50">
        <div
          class="fixed inset-0 bg-black/80"
          (click)="close()"
          aria-hidden="true"
        ></div>
        <div
          role="dialog"
          aria-modal="true"
          [class]="contentClasses()"
        >
          <button
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
export class DialogComponent {
  readonly open = model(false);
  readonly className = input('', { alias: 'class' });
  readonly openChange = output<boolean>();

  readonly contentClasses = computed(() =>
    cn(
      'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
      this.className(),
    ),
  );

  close(): void {
    this.open.set(false);
    this.openChange.emit(false);
  }
}

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class DialogHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col space-y-1.5 text-center sm:text-left', this.className()),
  );
}

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class DialogFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.className()),
  );
}

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class DialogTitleComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.className()),
  );
}

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class DialogDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}
