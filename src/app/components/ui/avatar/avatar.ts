import { Component, computed, input, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './avatar.html',

})
export class AvatarComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', this.className()),
  );
}
