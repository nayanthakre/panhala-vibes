import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'tfoot[ui-table-footer]',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './table-footer.html',

})
export class TableFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', this.className()),
  );
}
