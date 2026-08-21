import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'table[ui-table]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table.html',

})
export class TableComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('w-full caption-bottom text-sm', this.className()));
}
