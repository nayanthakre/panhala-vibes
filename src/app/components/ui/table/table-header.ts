import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'thead[ui-table-header]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-header.html',

})
export class TableHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&_tr]:border-b', this.className()));
}
