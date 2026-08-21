import { Component, computed, input, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-avatar-image',
  standalone: true,
  templateUrl: './avatar-image.html',

})
export class AvatarImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly className = input('', { alias: 'class' });
  readonly failed = signal(false);
  readonly classes = computed(() => cn('aspect-square h-full w-full', this.className()));
}
