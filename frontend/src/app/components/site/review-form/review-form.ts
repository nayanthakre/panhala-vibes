import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '@/app/services/review.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review-form.html',
  host: {
    class: 'block w-full',
  },
})
export class ReviewFormComponent {
  private readonly reviewService = inject(ReviewService);

  readonly posted = output<void>();

  readonly stars = [1, 2, 3, 4, 5] as const;

  readonly name = signal('');
  readonly location = signal('');
  readonly title = signal('');
  readonly message = signal('');
  readonly rating = signal(5);
  readonly status = signal<'idle' | 'saving' | 'done' | 'error'>('idle');
  readonly error = signal('');

  setRating(s: number): void {
    this.rating.set(s);
  }

  async submit(event?: Event): Promise<void> {
    if (event) {
      event.preventDefault();
    }

    const trimmedName = this.name().trim();
    const trimmedMessage = this.message().trim();

    if (trimmedName.length < 2) {
      this.status.set('error');
      this.error.set('Please enter a valid name (at least 2 characters).');
      return;
    }

    if (trimmedMessage.length < 5) {
      this.status.set('error');
      this.error.set('Please share at least a short experience (at least 5 characters).');
      return;
    }

    this.status.set('saving');
    this.error.set('');

    try {
      await this.reviewService.addReview({
        name: trimmedName,
        location: this.location().trim() || null,
        title: this.title().trim() || null,
        message: trimmedMessage,
        rating: this.rating(),
      });

      this.status.set('done');
      this.name.set('');
      this.location.set('');
      this.title.set('');
      this.message.set('');
      this.rating.set(5);
      this.posted.emit();

      // Reset done message after 5 seconds
      setTimeout(() => {
        if (this.status() === 'done') {
          this.status.set('idle');
        }
      }, 5000);
    } catch {
      this.status.set('error');
      this.error.set('Could not post your review. Please check the fields and try again.');
    }
  }
}
