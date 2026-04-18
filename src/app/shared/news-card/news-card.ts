import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-news-card',
  imports: [NgOptimizedImage, Button],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block w-100',
  },
})
export class NewsCard {
  imageSrc = input.required<string>();
  imageAlt = input.required<string>();
  title = input.required<string>();
  body = input.required<string>();
  /** Set on above-the-fold / LCP instances (e.g. Home visual QA) to satisfy NgOptimizedImage NG02955. */
  imagePriority = input(false, { transform: booleanAttribute });
  readMore = output<void>();
}
