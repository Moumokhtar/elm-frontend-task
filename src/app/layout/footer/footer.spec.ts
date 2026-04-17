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

  it('renders top grid and bottom bar sections', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="footer-top-grid"]'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="footer-bottom-bar"]'))).not.toBeNull();
  });

  it('renders four footer columns with expected headings', () => {
    const headings = fixture.debugElement
      .queryAll(By.css('[data-testid^="footer-col-"] h2'))
      .map((el) => el.nativeElement.textContent.trim());

    expect(headings).toEqual(['ملخص', 'روابط مهمة', 'الاتصال والدعم', 'تابعنا على', 'أدوات الاتاحة والوصول']);
  });

  it('renders all top-grid links as anchors with placeholder targets', () => {
    const topLinks = fixture.debugElement.queryAll(By.css('[data-testid="footer-top-grid"] a'));
    expect(topLinks).toHaveLength(18);
    topLinks.forEach((link) => {
      expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
      expect(link.nativeElement.getAttribute('href')).toBe('#');
      const text = link.nativeElement.textContent.trim();
      const ariaLabel = link.nativeElement.getAttribute('aria-label');
      expect(text.length > 0 || Boolean(ariaLabel)).toBe(true);
    });
  });

  it('renders three social icon links with aria-labels', () => {
    const socialLinks = fixture.debugElement.queryAll(By.css('[data-testid^="footer-social-"][href]'));
    expect(socialLinks).toHaveLength(3);
    socialLinks.forEach((link) => {
      expect(link.nativeElement.tagName.toLowerCase()).toBe('a');
      expect(link.nativeElement.getAttribute('href')).toBe('#');
      expect(link.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('renders three accessibility tool buttons with aria-labels', () => {
    const buttons = fixture.debugElement.queryAll(By.css('[data-testid^="footer-a11y-"]'));
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => {
      expect(button.nativeElement.tagName.toLowerCase()).toBe('button');
      expect(button.nativeElement.getAttribute('aria-label')).toBeTruthy();
      expect(button.nativeElement.getAttribute('type')).toBe('button');
    });
  });

  it('renders bottom links as placeholder anchors in expected order', () => {
    const links = fixture.debugElement.queryAll(By.css('[data-testid="footer-bottom-links"] a'));
    expect(links).toHaveLength(3);
    expect(links.map((el) => el.nativeElement.textContent.trim())).toEqual([
      'تطبيق الجوال',
      'RSS',
      'خريطة الموقع',
    ]);
    links.forEach((el) => {
      expect(el.nativeElement.getAttribute('href')).toBe('#');
    });
  });

  it('renders legal copy and branding inside bottom bar layout', () => {
    const logos = fixture.debugElement.queryAll(By.css('[data-testid="footer-branding"] img'));
    const copyright = fixture.debugElement.query(By.css('[data-testid="footer-copyright"]'));
    const meta = fixture.debugElement.query(By.css('[data-testid="footer-meta"]'));

    expect(logos).toHaveLength(2);
    expect(logos[0].nativeElement.getAttribute('src')).toContain('footer-elm-logo-white.svg');
    expect(logos[1].nativeElement.getAttribute('src')).toContain('footer-dga-logo-white.png');
    expect(logos[0].nativeElement.getAttribute('alt')).toBeTruthy();
    expect(logos[1].nativeElement.getAttribute('alt')).toBeTruthy();
    expect(copyright.nativeElement.textContent.trim()).toContain('جميع الحقوق محفوظة');
    expect(meta.nativeElement.textContent).toContain('تاريخ آخر تعديل');
  });
});
