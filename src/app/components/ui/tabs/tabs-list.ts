import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  host: { '[class]': 'classes()', role: 'tablist' },
  templateUrl: './tabs-list.html',

})
export class TabsListComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      this.className(),
    ),
  );
}
