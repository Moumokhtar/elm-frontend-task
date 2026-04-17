import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';

import { TagItem, TagSeverity } from '@shared/types';

@Component({
  selector: 'app-service-card',
  imports: [NgClass, Button],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block w-100',
  },
})
export class ServiceCard {
  title = input.required<string>();
  description = input.required<string>();
  tags = input<TagItem[]>([]);
  primaryLabel = input<string>('');
  secondaryLabel = input<string>('');
  primaryClick = output<void>();
  secondaryClick = output<void>();

  /** Same chip chrome for every tag; only this modifier class changes (text color variant). */
  protected tagVariantClass(severity: TagSeverity | undefined): string {
    return `service-card__tag--${severity ?? 'success'}`;
  }
}
