import { Component } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb/breadcrumb';
import { SectionHeader } from '@shared/section-header/section-header';

@Component({
  selector: 'app-home-page',
  imports: [Breadcrumb, SectionHeader],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
