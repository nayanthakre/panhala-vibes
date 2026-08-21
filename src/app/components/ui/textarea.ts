import { Component, computed, input } from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  template: `
    <textarea
      [attr.placeholder]="placeholder() || null"
      [attr.rows]="rows()"
      [disabled]="disabled()"
      [class]="classes()"
    ></textarea>
  `,
})
export class TextareaComponent {
  readonly placeholder = input('');
  readonly rows = input(3);
  readonly disabled = input(false);
  readonly className = input('', { alias: 'class' });

  readonly classes = computed(() =>
    cn(
      'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.className(),
    ),
  );
}
