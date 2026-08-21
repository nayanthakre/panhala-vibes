import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { TabsComponent } from './tabs';

@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  host: {
    role: 'tabpanel',
    '[hidden]': '!active()',
    '[class]': 'classes()',
  },
  templateUrl: './tabs-content.html',

})
export class TabsContentComponent {
  private readonly tabs = inject(TabsComponent);

  readonly value = input.required<string>();
  readonly className = input('', { alias: 'class' });

  readonly active = computed(() => this.tabs.value() === this.value());
  readonly classes = computed(() =>
    cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.className(),
    ),
  );
}
