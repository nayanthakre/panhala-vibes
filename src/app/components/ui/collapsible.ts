import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CollapsibleComponent {
  readonly open = model(false);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  toggle(): void {
    this.open.update((v) => !v);
  }
}

@Component({
  selector: 'ui-collapsible-trigger',
  standalone: true,
  template: `
    <button type="button" [class]="classes()" (click)="parent.toggle()">
      <ng-content />
    </button>
  `,
})
export class CollapsibleTriggerComponent {
  readonly parent = inject(CollapsibleComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}

@Component({
  selector: 'ui-collapsible-content',
  standalone: true,
  template: `
    @if (parent.open()) {
      <div [class]="classes()">
        <ng-content />
      </div>
    }
  `,
})
export class CollapsibleContentComponent {
  readonly parent = inject(CollapsibleComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}
