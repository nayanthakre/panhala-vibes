import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'tr[ui-table-row]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-row.html',

})
export class TableRowComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      this.className(),
    ),
  );
}
