import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PageHeroComponent,
  RevealComponent,
  ReviewFormComponent,
  ReviewListComponent,
  SectionHeadingComponent,
} from '@/app/components/site';
import { images } from '@/app/lib/panhala-data';
import { ReviewService } from '@/app/services/review.service';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    RevealComponent,
    SectionHeadingComponent,
    ReviewFormComponent,
    ReviewListComponent,
  ],
  template: `
    <main>
      <app-page-hero
        eyebrow="Community • Traveller Voices"
        title="Panhala Reviews & Stories"
        subtitle="Read firsthand experiences from travellers who explored the ancient gates, walked foggy Sahyadri ridges, and relished local flavours."
        [image]="images.sajjaKothi"
        alt="Panhala Fort views and Sajja Kothi ramparts"
      >
        <a href="#post-review" class="btn-base btn-gold">✍️ Post Your Review</a>
        <a routerLink="/explore" class="btn-base btn-ghost-light">Explore Places</a>
      </app-page-hero>

      <!-- Post Review & Highlights Section -->
      <section class="container-page py-16 sm:py-20" id="post-review">
        <app-reveal>
          <app-section-heading
            eyebrow="Share your story"
            title="Tell other travellers about your visit"
            subtitle="Your tips and experiences help explorers plan their Panhala journey better."
          />
        </app-reveal>

        <div class="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <app-reveal [delay]="60">
            <app-review-form />
          </app-reveal>

          <app-reveal [delay]="120">
            <div class="space-y-6">
              <!-- Rating Snapshot Card -->
              <div class="surface-card p-6 sm:p-8">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Community Rating</p>
                    <div class="mt-2 flex items-baseline gap-2">
                      <span class="text-display text-4xl font-bold text-foreground">{{ averageRating() }}</span>
                      <span class="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-xl tracking-wider text-gold">★★★★★</span>
                    <p class="mt-1 text-xs text-muted-foreground">Based on {{ reviewService.reviews().length }} reviews</p>
                  </div>
                </div>

                <div class="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-2">
                      <span class="text-forest font-semibold">✓</span> Heritage Preservation
                    </span>
                    <span class="font-medium text-foreground">4.9 / 5</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-2">
                      <span class="text-forest font-semibold">✓</span> Scenery & Trails
                    </span>
                    <span class="font-medium text-foreground">5.0 / 5</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-2">
                      <span class="text-forest font-semibold">✓</span> Local Cuisine
                    </span>
                    <span class="font-medium text-foreground">4.8 / 5</span>
                  </div>
                </div>
              </div>

              <!-- Quick Traveller Tips Card -->
              <div class="surface-card p-6 bg-sand-gradient sm:p-8">
                <h4 class="text-display text-lg font-semibold text-foreground">✨ Review Guidelines</h4>
                <ul class="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li class="flex items-start gap-2">
                    <span class="text-gold">✦</span>
                    <span>Mention specific spots you visited (e.g. Sajja Kothi, Teen Darwaza, Andhar Bavadi).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gold">✦</span>
                    <span>Share time of day, weather, or season tips (monsoon fog vs winter sunsets).</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gold">✦</span>
                    <span>Recommend favorite local food spots or homestay experiences.</span>
                  </li>
                </ul>
              </div>
            </div>
          </app-reveal>
        </div>
      </section>

      <!-- Review List Section -->
      <section class="bg-sand-gradient py-16 sm:py-20">
        <div class="container-page">
          <app-reveal>
            <app-section-heading
              eyebrow="All reviews"
              title="What travellers are saying"
              subtitle="Real experiences, memories and thoughts from fellow Sahyadri wanderers."
            />
          </app-reveal>

          <div class="mt-10">
            <app-review-list
              [reviews]="reviewService.reviews()"
              [loading]="reviewService.loading()"
            />
          </div>
        </div>
      </section>
    </main>
  `,
})
export class ReviewsPage {
  readonly reviewService = inject(ReviewService);
  readonly images = images;

  readonly averageRating = computed(() => {
    const list = this.reviewService.reviews();
    if (!list.length) return '5.0';
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return (sum / list.length).toFixed(1);
  });
}
