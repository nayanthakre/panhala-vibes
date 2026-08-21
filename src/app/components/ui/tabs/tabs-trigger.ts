import { Component, computed, inject, input, model } from '@angular/core';
import { cn } from '@/app/lib/utils';
import { TabsComponent } from './tabs';

@Component({
  selector: 'ui-tabs-trigger',
  standalone: true,
  templateUrl: './tabs-trigger.html',

})
export class TabsTriggerComponent {
  private readonly tabs = inject(TabsComponent);

  readonly value = input.required<string>();
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });

  readonly active = computed(() => this.tabs.value() === this.value());

  readonly classes = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
      this.active() && 'bg-background text-foreground shadow',
      this.className(),
    ),
  );

  activate(): void {
    if (!this.disabled()) this.tabs.select(this.value());
  }
}
