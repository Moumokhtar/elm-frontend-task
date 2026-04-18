import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Button } from 'primeng/button';

import { Breadcrumb } from '@shared/breadcrumb/breadcrumb';
import { FeedbackBlock } from '@shared/feedback-block/feedback-block';
import { SectionHeader } from '@shared/section-header/section-header';
import { ServiceCard } from '@shared/service-card/service-card';

import {
  SERVICE_DETAIL_BREADCRUMBS,
  SERVICE_DETAIL_DESCRIPTION,
  SERVICE_DETAIL_DOCUMENTS,
  SERVICE_DETAIL_FAQ,
  SERVICE_DETAIL_SECTION_SUBTITLE,
  SERVICE_DETAIL_SLA_LABEL,
  SERVICE_DETAIL_STEPS,
  SERVICE_DETAIL_TAGS,
  SERVICE_DETAIL_TERMS,
  SERVICE_DETAIL_TITLE,
  SERVICE_PAYMENT_IMAGES,
  SERVICE_RELATED_SERVICES,
  SERVICE_SIDEBAR,
  SERVICE_STORE_ICONS,
} from './service-detail-mock';

export type ServiceDetailInfoTab = 'steps' | 'terms' | 'documents' | 'faq';

@Component({
  selector: 'app-service-detail-page',
  imports: [
    Breadcrumb,
    Button,
    CarouselModule,
    FeedbackBlock,
    SectionHeader,
    ServiceCard,
  ],
  templateUrl: './service-detail-page.html',
  styleUrl: './service-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'service-detail-page d-block w-100',
    '[attr.dir]': '"rtl"',
    '[attr.lang]': '"ar"',
  },
})
export class ServiceDetailPage {
  readonly breadcrumbs = SERVICE_DETAIL_BREADCRUMBS;
  readonly title = SERVICE_DETAIL_TITLE;
  readonly tags = SERVICE_DETAIL_TAGS;
  readonly description = SERVICE_DETAIL_DESCRIPTION;
  readonly slaLabel = SERVICE_DETAIL_SLA_LABEL;
  readonly steps = SERVICE_DETAIL_STEPS;
  readonly terms = SERVICE_DETAIL_TERMS;
  readonly documents = SERVICE_DETAIL_DOCUMENTS;
  readonly faq = SERVICE_DETAIL_FAQ;
  readonly sidebar = SERVICE_SIDEBAR;
  readonly paymentImages = SERVICE_PAYMENT_IMAGES;
  readonly storeIcons = SERVICE_STORE_ICONS;
  readonly relatedServices = SERVICE_RELATED_SERVICES;
  readonly relatedSubtitle = SERVICE_DETAIL_SECTION_SUBTITLE;

  /** Figma Info `2036:31099` — tab ids match `p-tab` values used in tests / routes. */
  activeTab = model<ServiceDetailInfoTab>('steps');

  selectInfoTab(tab: ServiceDetailInfoTab): void {
    this.activeTab.set(tab);
  }

  /** Same breakpoints as `HomePage.servicesCarouselResponsive` (قسم الخدمات). */
  readonly relatedServicesCarouselResponsive = [
    { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];

  protected tagClass(tag: (typeof SERVICE_DETAIL_TAGS)[number]): string {
    const s = tag.severity ?? 'neutral';
    return `service-detail-page__chip service-detail-page__chip--${s}`;
  }

  onRateService(): void {
    console.log('قيم هذه الخدمة');
  }
}
