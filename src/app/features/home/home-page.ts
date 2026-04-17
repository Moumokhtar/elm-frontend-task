import { Component } from '@angular/core';
import { SectionHeader } from '@shared/section-header/section-header';

@Component({
  selector: 'app-home-page',
  imports: [SectionHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
