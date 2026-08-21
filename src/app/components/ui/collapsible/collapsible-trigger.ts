import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { CollapsibleComponent } from './collapsible';

@Component({
  selector: 'ui-collapsible-trigger',
  standalone: true,
  templateUrl: './collapsible-trigger.html',

})
export class CollapsibleTriggerComponent {
  readonly parent = inject(CollapsibleComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}
