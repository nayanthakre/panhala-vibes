import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'tbody[ui-table-body]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-body.html',

})
export class TableBodyComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&_tr:last-child]:border-0', this.className()));
}
