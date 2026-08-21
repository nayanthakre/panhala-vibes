import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div class="max-w-md text-center">
        <h1 class="text-7xl font-bold text-foreground">404</h1>
        <h2 class="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="mt-6">
          <a routerLink="/" class="btn-base btn-primary">Go home</a>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundPage {}
