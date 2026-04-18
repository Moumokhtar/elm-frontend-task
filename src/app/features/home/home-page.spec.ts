import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(
    'renders M4 section landmarks',
    () => {
      expect(fixture.debugElement.query(By.css('[data-testid="home-hero"]'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('[data-testid="home-about"]'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('[data-testid="home-services"]'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('[data-testid="home-news"]'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('[data-testid="home-partners"]'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('[data-testid="home-feedback"]'))).toBeTruthy();
    },
    15_000,
  );

  it('renders four stat cards', () => {
    expect(fixture.debugElement.queryAll(By.css('[data-testid^="home-stat-"]')).length).toBe(4);
  });

  it('includes desktop news grid and mobile carousel containers', () => {
    const news = fixture.debugElement.query(By.css('[data-testid="home-news"]'));
    expect(news.query(By.css('.d-none.d-lg-block'))).toBeTruthy();
    expect(news.query(By.css('.d-lg-none'))).toBeTruthy();
  });

  it('uses a heading for each hero slide title (not presentation-only text)', () => {
    const titles = fixture.nativeElement.querySelectorAll('.home-page__hero-title');
    expect(titles.length).toBeGreaterThan(0);
    titles.forEach((el: Element) => {
      expect(el.tagName.toLowerCase()).toBe('h2');
    });
  });

  it('names hero CTA buttons with slide context for assistive tech', () => {
    const ctas = fixture.nativeElement.querySelectorAll('[data-testid="home-hero-cta"]');
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((btn: Element) => {
      const label = btn.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.length).toBeGreaterThan(5);
      expect(label).toContain('إجراء رئيسي');
    });
  });

  it('exposes Arabic aria-labels on services carousel navigator buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const prev = root.querySelector('[aria-label="الخدمات السابقة"]');
    const next = root.querySelector('[aria-label="الخدمات التالية"]');
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
    expect(prev!.tagName.toLowerCase()).toBe('button');
    expect(next!.tagName.toLowerCase()).toBe('button');
  });

  it('exposes Arabic aria-labels on mobile news carousel navigator buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const prev = root.querySelector('[aria-label="الخبر السابق"]');
    const next = root.querySelector('[aria-label="الخبر التالي"]');
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
  });

  it('exposes Arabic aria-labels on partners carousel navigator buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const prev = root.querySelector('[aria-label="الشريك السابق"]');
    const next = root.querySelector('[aria-label="الشريك التالي"]');
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
  });
});
