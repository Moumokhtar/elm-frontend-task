import { Component } from '@angular/core';
import { Breadcrumb } from '@shared/breadcrumb/breadcrumb';
import { SectionHeader } from '@shared/section-header/section-header';
import { ServiceCard } from '@shared/service-card/service-card';

@Component({
  selector: 'app-home-page',
  imports: [Breadcrumb, SectionHeader, ServiceCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
