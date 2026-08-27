import { Injectable, signal } from '@angular/core';
import { initialReviews, Review } from '@/app/lib/review-data';

const STORAGE_KEY = 'panhala_reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly reviewsSignal = signal<Review[]>(this.loadStoredReviews());
  readonly reviews = this.reviewsSignal.asReadonly();
  readonly loading = signal(false);

  private loadStoredReviews(): Review[] {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return initialReviews;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if JSON parse fails
    }

    return initialReviews;
  }

  async addReview(newReview: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    this.loading.set(true);

    // Simulate network latency if desired for smooth feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    const review: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: newReview.name.trim(),
      location: newReview.location?.trim() || null,
      rating: newReview.rating,
      title: newReview.title?.trim() || null,
      message: newReview.message.trim(),
      created_at: new Date().toISOString(),
    };

    const updated = [review, ...this.reviewsSignal()];
    this.reviewsSignal.set(updated);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Handle storage quota issues gracefully
      }
    }

    this.loading.set(false);
    return review;
  }
}
