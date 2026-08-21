import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'th[ui-table-head]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-head.html',

})
export class TableHeadComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.className(),
    ),
  );
}
