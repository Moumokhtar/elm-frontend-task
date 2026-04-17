import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-partner-logo',
  imports: [],
  templateUrl: './partner-logo.html',
  styleUrl: './partner-logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerLogo {
  logoSrc = input<string>('');
  logoAlt = input<string>('');
  label = input<string>('');
}
