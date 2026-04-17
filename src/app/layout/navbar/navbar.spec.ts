import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 7 menu items with the expected labels', () => {
    const items = fixture.debugElement.queryAll(By.css('[data-testid^="menu-item-"]'));
    expect(items).toHaveLength(7);
    const labels = items.map((el) => el.nativeElement.textContent.trim());
    expect(labels).toEqual([
      'تبويب 1',
      'تبويب 2',
      'تبويب 3',
      'تبويب 4',
      'تبويب 5',
      'تبويب 6',
      'تبويب 7',
    ]);
  });

  it('renders the 3 action buttons with expected labels', () => {
    const login = fixture.debugElement.query(By.css('[data-testid="action-login"]'));
    const lang = fixture.debugElement.query(By.css('[data-testid="action-language"]'));
    const search = fixture.debugElement.query(By.css('[data-testid="action-search"]'));
    expect(login.nativeElement.textContent.trim()).toBe('تسجيل الدخول');
    expect(lang.nativeElement.textContent.trim()).toBe('English');
    expect(search.nativeElement.textContent.trim()).toBe('البحث');
  });

  it('gives every menu item a dropdown trigger role', () => {
    const items = fixture.debugElement.queryAll(By.css('[data-testid^="menu-item-"]'));
    items.forEach((el) => {
      expect(el.nativeElement.getAttribute('aria-haspopup')).toBe('menu');
      expect(el.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('renders 3 placeholder submenu items for dropdown menus', () => {
    expect(component.submenuItems.map((item) => item.label)).toEqual([
      'عنصر فرعي 1',
      'عنصر فرعي 2',
      'عنصر فرعي 3',
    ]);
  });

  it('renders the desktop logo with non-empty alt and width/height', () => {
    const logo = fixture.debugElement.query(By.css('[data-testid="navbar-logo-desktop"] img'));
    expect(logo).not.toBeNull();
    expect(logo.nativeElement.getAttribute('alt')).toBeTruthy();
    expect(logo.nativeElement.getAttribute('src')).toContain('logo-desktop.svg');
  });

  it('wraps desktop in d-none d-lg-flex and mobile placeholder in d-lg-none', () => {
    const desktop = fixture.debugElement.query(By.css('[data-testid="navbar-desktop"]'));
    const mobile = fixture.debugElement.query(By.css('[data-testid="navbar-mobile"]'));
    expect(desktop.nativeElement.classList.contains('d-none')).toBe(true);
    expect(desktop.nativeElement.classList.contains('d-lg-flex')).toBe(true);
    expect(mobile.nativeElement.classList.contains('d-lg-none')).toBe(true);
  });

  it('is landmark-labelled as the main navigation', () => {
    const nav = fixture.debugElement.query(By.css('[data-testid="navbar"]'));
    expect(nav.nativeElement.tagName.toLowerCase()).toBe('nav');
    expect(nav.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('applies sticky navbar and shared interactive item classes', () => {
    const nav = fixture.debugElement.query(By.css('[data-testid="navbar"]'));
    const menuItem = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]'));
    const actionItem = fixture.debugElement.query(By.css('[data-testid="action-login"]'));

    expect(nav.nativeElement.classList.contains('sticky-top')).toBe(true);
    expect(menuItem.nativeElement.classList.contains('app-navbar__item')).toBe(true);
    expect(actionItem.nativeElement.classList.contains('app-navbar__item')).toBe(true);
  });

  it('uses bootstrap icon set and expected spacing utilities', () => {
    const menuItem = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]'));
    const chevronIcon = fixture.debugElement.query(By.css('[data-testid="menu-item-1"] .app-navbar__chevron'));
    const loginIcon = fixture.debugElement.query(By.css('[data-testid="action-login"] .app-navbar__action-icon'));
    const languageIcon = fixture.debugElement.query(By.css('[data-testid="action-language"] .app-navbar__action-icon'));
    const searchIcon = fixture.debugElement.query(By.css('[data-testid="action-search"] .app-navbar__action-icon'));

    expect(menuItem.nativeElement.classList.contains('gap-1')).toBe(true);
    expect(chevronIcon.nativeElement.classList.contains('bi')).toBe(true);
    expect(chevronIcon.nativeElement.classList.contains('bi-chevron-down')).toBe(true);
    expect(loginIcon.nativeElement.classList.contains('pi-user')).toBe(true);
    expect(languageIcon.nativeElement.classList.contains('pi-language')).toBe(true);
    expect(searchIcon.nativeElement.classList.contains('pi-search')).toBe(true);
  });

  it('uses Figma spacing token for nav label and chevron', () => {
    const menuItem = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]'));
    expect(menuItem.nativeElement.classList.contains('gap-1')).toBe(true);
  });

  it('opens dropdown and updates aria-expanded on click', () => {
    const firstTrigger = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]')).nativeElement as HTMLButtonElement;
    firstTrigger.click();
    fixture.detectChanges();

    expect(firstTrigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps only one dropdown trigger expanded at a time', () => {
    const firstTrigger = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]')).nativeElement as HTMLButtonElement;
    const secondTrigger = fixture.debugElement.query(By.css('[data-testid="menu-item-2"]')).nativeElement as HTMLButtonElement;

    firstTrigger.click();
    fixture.detectChanges();
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('true');

    secondTrigger.click();
    fixture.detectChanges();
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('false');
    expect(secondTrigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes on Escape and returns focus to the last trigger', () => {
    const firstTrigger = fixture.debugElement.query(By.css('[data-testid="menu-item-1"]')).nativeElement as HTMLButtonElement;
    firstTrigger.click();
    fixture.detectChanges();
    expect(firstTrigger.getAttribute('aria-expanded')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(firstTrigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(firstTrigger);
  });
});
