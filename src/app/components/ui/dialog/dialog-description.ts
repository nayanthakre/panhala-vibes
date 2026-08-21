import { Component, computed, input, model, output } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './dialog-description.html',

})
export class DialogDescriptionComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('text-sm text-muted-foreground', this.className()));
}
