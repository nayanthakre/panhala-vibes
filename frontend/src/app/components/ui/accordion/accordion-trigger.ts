import { Component, computed, inject, input } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { AccordionItemComponent } from './accordion-item';

@Component({
  selector: 'ui-accordion-trigger',
  standalone: true,
  templateUrl: './accordion-trigger.html',

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
