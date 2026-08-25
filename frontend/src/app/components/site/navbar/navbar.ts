import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent } from 'rxjs';
import { cn } from '@/app/lib/utils';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Plan Your Visit', to: '/plan' },
  { label: 'Food', to: '/food' },
  { label: 'Stay', to: '/stay' },
  { label: 'Local', to: '/local' },
  { label: 'History', to: '/history' },
  { label: 'Map', to: '/map' },
] as const;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  host: {
    class: 'block w-full',
  },
})
export class NavbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly links = links;
  readonly scrolled = signal(false);
  readonly open = signal(false);

  readonly headerClass = computed(() =>
    cn(
      'sticky top-0 z-50 transition-all duration-300',
      this.scrolled()
        ? 'border-b border-border/70 bg-background/85 shadow-[0_6px_24px_-18px_oklch(0.3_0.03_110_/_0.5)] backdrop-blur-md'
        : 'bg-transparent',
    ),
  );

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const update = () => this.scrolled.set(window.scrollY > 24);
    update();

    fromEvent(window, 'scroll', { passive: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(update);
  }
}
