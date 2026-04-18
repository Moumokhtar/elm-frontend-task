import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { FeedbackBlock } from '@shared/feedback-block/feedback-block';
import { NewsCard } from '@shared/news-card/news-card';
import { PartnerLogo } from '@shared/partner-logo/partner-logo';
import { SectionHeader } from '@shared/section-header/section-header';
import { ServiceCard } from '@shared/service-card/service-card';

import {
  HOME_ABOUT_SUBTITLE,
  HOME_HERO_SLIDES,
  HOME_NEWS,
  HOME_NEWS_SUBTITLE,
  HOME_PARTNERS,
  HOME_SERVICES,
  HOME_SERVICES_SUBTITLE,
  HOME_STATS,
} from './home-mock';

@Component({
  selector: 'app-home-page',
  imports: [
    CarouselModule,
    FeedbackBlock,
    NewsCard,
    PartnerLogo,
    SectionHeader,
    ServiceCard,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'home-page d-block w-100',
    '[attr.dir]': '"rtl"',
    '[attr.lang]': '"ar"',
  },
})
export class HomePage {
  heroSlides = HOME_HERO_SLIDES;
  aboutSubtitle = HOME_ABOUT_SUBTITLE;
  servicesSubtitle = HOME_SERVICES_SUBTITLE;
  newsSubtitle = HOME_NEWS_SUBTITLE;
  stats = HOME_STATS;
  services = HOME_SERVICES;
  newsItems = HOME_NEWS;
  partners = HOME_PARTNERS;

  heroBg = '/images/home/hero-bg.jpg';

  servicesCarouselResponsive = [
    { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];

  partnersCarouselResponsive = [
    { breakpoint: '1199px', numVisible: 4, numScroll: 1 },
    /** Mobile: one logo per view so arrows have clear side room (Figma-aligned nav 40×40). */
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];
}
