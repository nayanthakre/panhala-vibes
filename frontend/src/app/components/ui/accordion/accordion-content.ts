import { Component, computed, inject, input, model, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { AccordionItemComponent } from './accordion-item';

@Component({
  selector: 'ui-accordion-content',
  standalone: true,
  templateUrl: './accordion-content.html',

})
export class AccordionContentComponent {
  readonly item = inject(AccordionItemComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('overflow-hidden text-sm pb-4 pt-0', this.className()));
}
