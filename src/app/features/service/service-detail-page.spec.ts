import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { ServiceDetailPage } from './service-detail-page';

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

describe('ServiceDetailPage', () => {
  let fixture: ComponentFixture<ServiceDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailPage);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders Figma tent layer `2036:31011` under main surface with fixed height', () => {
    const tent = fixture.debugElement.query(By.css('[data-testid="service-detail-tent"]'));
    expect(tent).toBeTruthy();
    expect(tent.nativeElement.getAttribute('data-figma-node')).toBe('2036:31011');
    expect(tent.nativeElement.getAttribute('style')).toMatch(/height:\s*var\(\s*--service-detail-tent-height\s*\)/);
  });

  it('renders title, breadcrumb, and primary CTA', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-title"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="breadcrumb"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-start-btn"]'))).toBeTruthy();
  });

  it('renders tags and description', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-tags"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-description"]'))).toBeTruthy();
  });

  it(
    'renders info tab list with steps tabpanel, video, and steps list under `2036:31099`',
    () => {
      const info = fixture.debugElement.query(By.css('[data-figma-node="2036:31099"]'));
      expect(info).toBeTruthy();
      const tabs = fixture.debugElement.query(By.css('[data-testid="service-detail-tabs"]'));
      const panel = fixture.debugElement.query(By.css('#service-detail-panel-steps'));
      const video = fixture.debugElement.query(By.css('[data-testid="service-detail-video-placeholder"]'));
      const stepList = fixture.debugElement.query(By.css('[data-testid="service-detail-steps-list"]'));
      expect(tabs?.nativeElement.parentElement).toBe(info?.nativeElement);
      expect(panel?.nativeElement.parentElement).toBe(info?.nativeElement);
      expect(panel?.nativeElement.getAttribute('role')).toBe('tabpanel');
      expect(panel?.nativeElement.getAttribute('aria-labelledby')).toBe('service-detail-tab-steps');
      expect(video?.nativeElement.parentElement).toBe(panel?.nativeElement);
      expect(stepList?.nativeElement.parentElement).toBe(panel?.nativeElement);
      expect(tabs?.nativeElement.getAttribute('role')).toBe('tablist');
    },
    15_000,
  );

  it('exposes string aria-selected on tabs and aria-controls wiring for the steps tab', () => {
    const stepsTab = fixture.debugElement.query(By.css('#service-detail-tab-steps')).nativeElement as HTMLButtonElement;
    expect(stepsTab.getAttribute('aria-selected')).toBe('true');
    expect(stepsTab.getAttribute('aria-controls')).toBe('service-detail-panel-steps');

    const termsTab = fixture.debugElement.query(By.css('#service-detail-tab-terms')).nativeElement as HTMLButtonElement;
    expect(termsTab.getAttribute('aria-selected')).toBe('false');
    expect(termsTab.getAttribute('aria-controls')).toBe('service-detail-panel-terms');
  });

  it('exposes Arabic aria-labels on related services carousel navigator buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const prev = root.querySelector('[aria-label="الخدمات السابقة"]');
    const next = root.querySelector('[aria-label="الخدمات التالية"]');
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
  });

  it('maps Figma Service frame `2036:31033` (main, sidebar, FAQ tab)', () => {
    const frame = fixture.debugElement.query(By.css('[data-testid="service-detail-service-frame"]'));
    expect(frame).toBeTruthy();
    expect(frame.nativeElement.getAttribute('data-figma-node')).toBe('2036:31033');
    expect(fixture.debugElement.query(By.css('[data-figma-node="2036:31086"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-figma-node="2036:31034"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#service-detail-tab-faq'))).toBeTruthy();
    fixture.componentInstance.selectInfoTab('faq');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-faq-panel"]'))).toBeTruthy();
  });

  it('renders sidebar payment tiles', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-sidebar"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-payments"]'))).toBeTruthy();
  });

  it('renders related services carousel', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="service-detail-related"]'))).toBeTruthy();
  });

  it('logs when rate CTA handler runs', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    fixture.componentInstance.onRateService();
    expect(spy).toHaveBeenCalledWith('قيم هذه الخدمة');
    spy.mockRestore();
  });
});
