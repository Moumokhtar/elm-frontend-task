import { Component } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb/breadcrumb';
import { NewsCard } from '@shared/news-card/news-card';
import { FeedbackBlock } from '@shared/feedback-block/feedback-block';
import { SectionHeader } from '@shared/section-header/section-header';
import { ServiceCard } from '@shared/service-card/service-card';

@Component({
  selector: 'app-home-page',
  imports: [Breadcrumb, FeedbackBlock, NewsCard, SectionHeader, ServiceCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
