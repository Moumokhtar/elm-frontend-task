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
 * Figma **Feedback** `2036:31121` / Home `2036:65757` — column stack (last modified, service rating, helpfulness).
 * Outer **vertical** padding: `:host` uses `u-page-strip-y`. **Horizontal** gutter: `u-page-strip-x` on row inners only.
 * Brand top borders (`u-brand-border-top-2`) sit on full-width rows so strokes span the viewport edge-to-edge.
 *
 * **Required:** helpfulness row. **Optional:** `showLastModifiedRow`, `showServiceRatingRow`.
 */
export type LastModifiedRowAlign = 'start' | 'end';

@Component({
  selector: 'app-feedback-block',
  imports: [Button],
  templateUrl: './feedback-block.html',
  styleUrl: './feedback-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block w-100 bg-white u-page-strip-y',
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
