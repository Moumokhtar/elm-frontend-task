import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { FormPage } from '@features/form/form-page';
import { HomePage } from '@features/home/home-page';
import { NotFoundPage } from '@features/not-found/not-found-page';
import { ServiceDetailPage } from '@features/service/service-detail-page';
import { routes } from './app.routes';

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe(): void {
      void 0;
    }
    unobserve(): void {
      void 0;
    }
    disconnect(): void {
      void 0;
    }
  } as unknown as typeof ResizeObserver;
}

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

  it(
    'renders ServiceDetailPage at /service',
    async () => {
      const active = await harness.navigateByUrl('/service', ServiceDetailPage);
      expect(active).toBeInstanceOf(ServiceDetailPage);
    },
    15_000,
  );

  it('renders FormPage at /form', async () => {
    const active = await harness.navigateByUrl('/form', FormPage);
    expect(active).toBeInstanceOf(FormPage);
  });

  it('renders NotFoundPage for unknown paths', async () => {
    const active = await harness.navigateByUrl('/does-not-exist', NotFoundPage);
    expect(active).toBeInstanceOf(NotFoundPage);
  });
});
