import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

const MOBILE_BREAKPOINT = 768;

@Injectable({ providedIn: 'root' })
export class IsMobileService {
  private readonly destroyRef = inject(DestroyRef);
  readonly isMobile = signal(false);

  constructor() {
    if (typeof window === 'undefined') return;

    const update = () => this.isMobile.set(window.innerWidth < MOBILE_BREAKPOINT);
    update();

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(update);
  }
}

/** Functional helper matching the React useIsMobile hook. */
export function useIsMobile(): boolean {
  return inject(IsMobileService).isMobile();
}
