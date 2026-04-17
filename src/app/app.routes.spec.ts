import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { HomePage } from '@features/home/home-page';
import { ServiceDetailPage } from '@features/service/service-detail-page';
import { FormPage } from '@features/form/form-page';
import { routes } from './app.routes';

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    harness = await RouterTestingHarness.create();
  });

  it('renders HomePage at /', async () => {
    const active = await harness.navigateByUrl('/', HomePage);
    expect(active).toBeInstanceOf(HomePage);
  });

  it('renders ServiceDetailPage at /service', async () => {
    const active = await harness.navigateByUrl('/service', ServiceDetailPage);
    expect(active).toBeInstanceOf(ServiceDetailPage);
  });

  it('renders FormPage at /form', async () => {
    const active = await harness.navigateByUrl('/form', FormPage);
    expect(active).toBeInstanceOf(FormPage);
  });
});
