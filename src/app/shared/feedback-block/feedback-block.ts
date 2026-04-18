import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { Button } from 'primeng/button';

/**
 * Figma **Feedback** `2036:31121` on [Service Page – AR `2036:31010`](https://www.figma.com/design/wh34oGmGLBesPFMgXM4BLS/Frontend-Task--RTL?node-id=2036-31010&m=dev):
 * column stack (`flex-col` / `items-start` in MCP) — last modified, service rating, page helpfulness.
 *
 * **Required:** the page-helpfulness row (yes/no + stats) is always rendered.
 * **Optional:** last-modified and service-rating rows (`showLastModifiedRow`, `showServiceRatingRow`).
 */
export type LastModifiedRowAlign = 'start' | 'end';

@Component({
  selector: 'app-feedback-block',
  imports: [Button],
  templateUrl: './feedback-block.html',
  styleUrl: './feedback-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block w-100',
    '[attr.dir]': '"rtl"',
    '[attr.lang]': '"ar"',
  },
})
export class FeedbackBlock {
  /** Optional — Figma `2036:31122` Last Modified row. */
  showLastModifiedRow = input(false);
  /** Horizontal alignment when `showLastModifiedRow` is true. Default `end` preserves previous layout. */
  showLastModifiedRowAlign = input<LastModifiedRowAlign>('end');
  /** Optional — Figma `2036:27925` Rating1 row. */
  showServiceRatingRow = input(false);
  /** Page helpfulness row (`2036:30008`). Home frame `2036:65608` shows last-modified only — set false there. */
  showHelpfulnessRow = input(true, { transform: booleanAttribute });

  lastModifiedText = input(
    'تاريخ آخر تعديل: 04/12/2020 - 4:13 م بتوقيت السعودية',
  );
  averageRating = input(3.9);
  reviewCount = input(1544);
  rateCtaLabel = input('قيم هذه الخدمة');
  seedYes = input(0);
  seedNo = input(0);

  rateClick = output<void>();

  protected readonly starIndexes = [1, 2, 3, 4, 5] as const;

  /** Green top border on helpfulness only when a row sits above it (Figma stack). */
  protected readonly helpfulnessHasUpperRow = computed(
    () => this.showLastModifiedRow() || this.showServiceRatingRow(),
  );

  private readonly bumpYes = signal(0);
  private readonly bumpNo = signal(0);
  protected readonly vote = signal<'yes' | 'no' | null>(null);

  protected readonly yesCount = computed(() => this.seedYes() + this.bumpYes());
  protected readonly noCount = computed(() => this.seedNo() + this.bumpNo());

  protected readonly totalResponses = computed(() => this.yesCount() + this.noCount());

  protected readonly yesPercent = computed(() => {
    const t = this.totalResponses();
    if (t === 0) return 0;
    return Math.round((100 * this.yesCount()) / t);
  });

  protected readonly buttonsLocked = computed(() => this.vote() !== null);

  protected readonly showStatsLine = computed(() => {
    if (this.totalResponses() <= 0) return false;
    return this.seedYes() > 0 || this.seedNo() > 0 || this.vote() !== null;
  });

  protected starState(i: number): 'on' | 'half' | 'off' {
    const v = this.averageRating();
    if (i <= Math.floor(v)) return 'on';
    if (i === Math.floor(v) + 1 && v % 1 >= 0.25) return 'half';
    return 'off';
  }

  protected onYes(): void {
    if (this.vote() !== null) return;
    this.bumpYes.update((v) => v + 1);
    this.vote.set('yes');
  }

  protected onNo(): void {
    if (this.vote() !== null) return;
    this.bumpNo.update((v) => v + 1);
    this.vote.set('no');
  }
}
