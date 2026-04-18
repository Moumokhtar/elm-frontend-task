import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'not-found-page d-block w-100',
    '[attr.dir]': '"rtl"',
    '[attr.lang]': '"ar"',
  },
})
export class NotFoundPage {}
