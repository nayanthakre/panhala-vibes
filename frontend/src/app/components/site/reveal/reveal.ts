import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { cn } from '@/app/lib/utils';

@Component({
  selector: 'app-reveal',
  standalone: true,
  host: {
    '[class]': 'hostClass()',
    '[style.transition-delay]': 'delay() + "ms"',
  },
  templateUrl: './reveal.html',

})
export class RevealComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  readonly delay = input(0);
  readonly className = input('', { alias: 'class' });
  readonly shown = signal(false);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      if (typeof IntersectionObserver === 'undefined') {
        this.shown.set(true);
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.shown.set(true);
            this.observer?.disconnect();
          }
        },
        { rootMargin: '0px 0px 40px 0px', threshold: 0.01 },
      );
      this.observer.observe(el);
    });
  }

  hostClass(): string {
    return cn('reveal block w-full', this.shown() ? 'reveal-in' : '', this.className());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
