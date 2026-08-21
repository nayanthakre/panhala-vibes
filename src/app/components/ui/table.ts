import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'table[ui-table]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class TableComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('w-full caption-bottom text-sm', this.className()));
}

@Component({
  selector: 'thead[ui-table-header]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class TableHeaderComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&_tr]:border-b', this.className()));
}

@Component({
  selector: 'tbody[ui-table-body]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class TableBodyComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('[&_tr:last-child]:border-0', this.className()));
}

@Component({
  selector: 'tfoot[ui-table-footer]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class TableFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', this.className()),
  );
}

@Component({
  selector: 'tr[ui-table-row]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
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

@Component({
  selector: 'th[ui-table-head]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
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

@Component({
  selector: 'td[ui-table-cell]',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
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
