import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { CollapsibleComponent } from './collapsible';

@Component({
  selector: 'ui-collapsible-content',
  standalone: true,
  templateUrl: './collapsible-content.html',

})
export class CollapsibleContentComponent {
  readonly parent = inject(CollapsibleComponent);
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));
}
