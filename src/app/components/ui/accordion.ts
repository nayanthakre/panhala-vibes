import { Component, computed, inject, input, model, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AccordionComponent {
  readonly type = input<'single' | 'multiple'>('single');
  readonly value = model<string | string[]>('');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  isOpen(itemValue: string): boolean {
    const current = this.value();
    return Array.isArray(current) ? current.includes(itemValue) : current === itemValue;
  }

  toggle(itemValue: string): void {
    if (this.type() === 'multiple') {
      const current = Array.isArray(this.value()) ? [...(this.value() as string[])] : [];
      const idx = current.indexOf(itemValue);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(itemValue);
      this.value.set(current);
      return;
    }
    this.value.set(this.value() === itemValue ? '' : itemValue);
  }
}

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class AccordionItemComponent {
  readonly value = input.required<string>();
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('border-b', this.className()));

  private readonly accordion = inject(AccordionComponent);

  isOpen(): boolean {
    return this.accordion.isOpen(this.value());
  }

  toggle(): void {
    this.accordion.toggle(this.value());
  }
}

@Component({
  selector: 'ui-accordion-trigger',
  standalone: true,
  template: `
    <h3 class="flex">
      <button
        type="button"
        [attr.aria-expanded]="item.isOpen()"
        [class]="classes()"
        (click)="item.toggle()"
      >
        <ng-content />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          [class.rotate-180]="item.isOpen()"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  `,
})
export class AccordionTriggerComponent {
  readonly item = inject(AccordionItemComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left w-full',
      this.className(),
    ),
  );
}

@Component({
  selector: 'ui-accordion-content',
  standalone: true,
  template: `
    @if (item.isOpen()) {
      <div [class]="classes()">
        <ng-content />
      </div>
    }
  `,
})
export class AccordionContentComponent {
  readonly item = inject(AccordionItemComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('overflow-hidden text-sm pb-4 pt-0', this.className()));
}
