import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a semantic footer landmark with label', () => {
    const footer = fixture.debugElement.query(By.css('[data-testid="footer"]'));
    expect(footer).not.toBeNull();
    expect(footer.nativeElement.tagName.toLowerCase()).toBe('footer');
    expect(footer.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('renders top grid, middle row, and bottom bar scaffold sections', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="footer-top-grid"]'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="footer-middle-row"]'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="footer-bottom-bar"]'))).not.toBeNull();
  });

  it('renders four footer columns with expected headings', () => {
    const headings = fixture.debugElement
      .queryAll(By.css('[data-testid^="footer-col-"] h2'))
      .map((el) => el.nativeElement.textContent.trim());

    expect(headings).toEqual(['ملخص', 'روابط مهمة', 'الاتصال والدعم', 'تابعنا على']);
  });

  it('renders all top-grid links as anchors with placeholder targets', () => {
    const topLinks = fixture.debugElement.queryAll(By.css('[data-testid="footer-top-grid"] a'));
    expect(topLinks).toHaveLength(18);
    topLinks.forEach((link) => {
      expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
      expect(link.nativeElement.getAttribute('href')).toBe('#');
      expect(link.nativeElement.textContent.trim().length).toBeGreaterThan(0);
    });
  });
});
