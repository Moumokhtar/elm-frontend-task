import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-page-feedback-bar',
  imports: [Button],
  templateUrl: './page-feedback-bar.html',
  styleUrl: './page-feedback-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block w-100',
  },
})
export class PageFeedbackBar {
  seedYes = input(0);
  seedNo = input(0);

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

  /** Figma copy: stats line once there is any response data or the user has voted. */
  protected readonly showStatsLine = computed(() => {
    if (this.totalResponses() <= 0) return false;
    return this.seedYes() > 0 || this.seedNo() > 0 || this.vote() !== null;
  });

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
