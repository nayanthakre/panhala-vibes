import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class TabsComponent {
  readonly value = model('');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  select(value: string): void {
    this.value.set(value);
  }
}

@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  host: { '[class]': 'classes()', role: 'tablist' },
  template: `<ng-content />`,
})
export class TabsListComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      this.className(),
    ),
  );
}

@Component({
  selector: 'ui-tabs-trigger',
  standalone: true,
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="active()"
      [attr.data-state]="active() ? 'active' : 'inactive'"
      [disabled]="disabled()"
      [class]="classes()"
      (click)="activate()"
    >
      <ng-content />
    </button>
  `,
})
export class TabsTriggerComponent {
  private readonly tabs = inject(TabsComponent);

  readonly value = input.required<string>();
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });

  readonly active = computed(() => this.tabs.value() === this.value());

  readonly classes = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
      this.active() && 'bg-background text-foreground shadow',
      this.className(),
    ),
  );

  activate(): void {
    if (!this.disabled()) this.tabs.select(this.value());
  }
}

@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  host: {
    role: 'tabpanel',
    '[hidden]': '!active()',
    '[class]': 'classes()',
  },
  template: `<ng-content />`,
})
export class TabsContentComponent {
  private readonly tabs = inject(TabsComponent);

  readonly value = input.required<string>();
  readonly className = input('', { alias: 'class' });

  readonly active = computed(() => this.tabs.value() === this.value());
  readonly classes = computed(() =>
    cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.className(),
    ),
  );
}
