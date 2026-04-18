import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-section-header',
  imports: [RouterLink, Button],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  title = input.required<string>();
  /** When set, applied to the `<h2>` for `aria-labelledby` / in-page anchors. */
  titleId = input<string>('');
  subtitle = input<string>('');
  actionLabel = input<string>('');
  actionRoute = input<string | readonly (string | number)[] | undefined>(undefined);

  /** RouterLink is only applied when a non-empty route is provided. */
  protected readonly actionLink = computed(() => {
    const route = this.actionRoute();
    if (route === undefined || route === null || route === '') {
      return undefined;
    }
    return route;
  });
}
