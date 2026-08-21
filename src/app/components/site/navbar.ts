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
  template: `
    <header [class]="headerClass()">
      <nav class="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <a
          routerLink="/"
          class="flex min-w-0 items-center gap-2"
          (click)="open.set(false)"
        >
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-gradient text-lg">
            🏰
          </span>
          <span class="text-display truncate text-lg text-foreground sm:text-xl">
            Panhala Explorer
          </span>
        </a>

        <div class="flex items-center gap-2">
          <ul class="hidden items-center gap-1 xl:flex">
            @for (l of links; track l.to + l.label) {
              <li>
                <a
                  [routerLink]="l.to"
                  routerLinkActive="text-foreground bg-secondary"
                  [routerLinkActiveOptions]="{ exact: l.to === '/' }"
                  class="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {{ l.label }}
                </a>
              </li>
            }
          </ul>

          <a routerLink="/plan" class="btn-base btn-primary hidden shrink-0 sm:inline-flex">
            Plan My Visit <span class="arrow">→</span>
          </a>

          <button
            type="button"
            class="btn-base btn-outline shrink-0 px-3 xl:hidden"
            [attr.aria-expanded]="open()"
            aria-label="Toggle navigation menu"
            (click)="open.update((v) => !v)"
          >
            {{ open() ? '✕' : '☰' }}
          </button>
        </div>
      </nav>

      @if (open()) {
        <div class="border-t border-border bg-background/95 backdrop-blur-md xl:hidden">
          <ul class="container-page grid gap-1 py-4">
            @for (l of links; track 'm' + l.to + l.label) {
              <li>
                <a
                  [routerLink]="l.to"
                  class="block rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  (click)="open.set(false)"
                >
                  {{ l.label }}
                </a>
              </li>
            }
            <li class="pt-2">
              <a
                routerLink="/plan"
                class="btn-base btn-gold w-full"
                (click)="open.set(false)"
              >
                ✨ Plan My Panhala Day
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
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
