import { Routes } from '@angular/router';
import { FormPage } from '@features/form/form-page';
import { HomePage } from '@features/home/home-page';
import { NotFoundPage } from '@features/not-found/not-found-page';
import { ServiceDetailPage } from '@features/service/service-detail-page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'service', component: ServiceDetailPage },
  { path: 'form', component: FormPage },
  { path: '**', component: NotFoundPage },
];
