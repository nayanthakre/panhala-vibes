import { Component, computed, inject, input, model, signal } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  host: { '[class]': 'classes()' },
  templateUrl: './accordion.html',

})
export class AccordionComponent {
  readonly type = input<'single' | 'multiple'>('single');
  readonly value = model<string | string[]>('');
  readonly className = input('', { alias: 'class' });
  readonly classes = computed(() => cn(this.className()));

  isOpen(itemValue: string): boolean {
    const current = this.value();
    return Array.isArray(current) ? current.includes(itemValue) : current === itemValue;
  }

  toggle(itemValue: string): void {
    if (this.type() === 'multiple') {
      const current = Array.isArray(this.value()) ? [...(this.value() as string[])] : [];
      const idx = current.indexOf(itemValue);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(itemValue);
      this.value.set(current);
      return;
    }
    this.value.set(this.value() === itemValue ? '' : itemValue);
  }
}
