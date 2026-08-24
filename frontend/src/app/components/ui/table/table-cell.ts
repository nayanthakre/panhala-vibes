import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'td[ui-table-cell]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-cell.html',

})
export class TableCellComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.className(),
    ),
  );
}
