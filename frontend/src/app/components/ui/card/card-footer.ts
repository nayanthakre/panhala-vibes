import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './card-footer.html',

})
export class CardFooterComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn('flex items-center p-6 pt-0', this.className()));
}
