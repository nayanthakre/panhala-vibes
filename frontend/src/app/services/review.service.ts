import { Injectable, signal } from '@angular/core';
import { initialReviews, Review } from '@/app/lib/review-data';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly apiUrl = 'https://panhala-vibes-backend.onrender.com/api/reviews';
  private readonly reviewsSignal = signal<Review[]>([]);
  readonly reviews = this.reviewsSignal.asReadonly();
  readonly loading = signal(false);

  constructor() {
    this.loadReviews();
  }

  private async loadReviews(): Promise<void> {
    try {
      const res = await fetch(this.apiUrl);
      if (res.ok) {
        const data = await res.json();
        this.reviewsSignal.set(data);
      } else {
        this.reviewsSignal.set(initialReviews);
      }
    } catch (error) {
      console.error('Failed to load reviews from backend, using initial data.', error);
      this.reviewsSignal.set(initialReviews);
    }
  }

  async addReview(newReview: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    this.loading.set(true);

    const reviewPayload = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: newReview.name.trim(),
      location: newReview.location?.trim() || null,
      rating: newReview.rating,
      title: newReview.title?.trim() || null,
      message: newReview.message.trim(),
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to post review');
      }

      const savedReview = await response.json();

      const updated = [savedReview, ...this.reviewsSignal()];
      this.reviewsSignal.set(updated);

      this.loading.set(false);
      return savedReview;
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }
}
