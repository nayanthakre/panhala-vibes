import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-sheet',
  standalone: true,
  templateUrl: './sheet.html',

})
export class SheetComponent {
  readonly open = model(false);
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('right');
  readonly className = input('', { alias: 'class' });
  readonly openChange = output<boolean>();

  readonly panelClasses = computed(() => {
    const side = this.side();
    const sideClass =
      side === 'right'
        ? 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm'
        : side === 'left'
          ? 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm'
          : side === 'top'
            ? 'inset-x-0 top-0 border-b'
            : 'inset-x-0 bottom-0 border-t';

    return cn('fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out', sideClass, this.className());
  });

  close(): void {
    this.open.set(false);
    this.openChange.emit(false);
  }
}
