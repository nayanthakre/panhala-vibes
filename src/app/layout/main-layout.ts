import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavbarComponent } from '@/app/components/site';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="flex min-h-dvh flex-col">
      <app-navbar />
      <div class="flex-1">
        <router-outlet />
      </div>
      <app-footer />
    </div>
  `,
})
export class MainLayoutComponent {}
