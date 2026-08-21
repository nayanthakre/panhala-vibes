import { Component, computed, input, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-avatar-fallback',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './avatar-fallback.html',

})
export class AvatarFallbackComponent {
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() =>
    cn('flex h-full w-full items-center justify-center rounded-full bg-muted', this.className()),
  );
}
