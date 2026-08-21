import { Component, computed, inject, input } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { AccordionComponent } from './accordion';

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './accordion-item.html',

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
