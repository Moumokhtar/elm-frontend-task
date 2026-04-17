import { Routes } from '@angular/router';
import { HomePage } from '@features/home/home-page';
import { ServiceDetailPage } from '@features/service/service-detail-page';
import { FormPage } from '@features/form/form-page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'service', component: ServiceDetailPage },
  { path: 'form', component: FormPage },
];
