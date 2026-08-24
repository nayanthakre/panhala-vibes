import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  templateUrl: './dialog.html',

})
export class DialogComponent {
  readonly open = model(false);
  readonly className = input('', { alias: 'class' });
  readonly openChange = output<boolean>();

  readonly contentClasses = computed(() =>
    cn(
      'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg',
      this.className(),
    ),
  );

  close(): void {
    this.open.set(false);
    this.openChange.emit(false);
  }
}
