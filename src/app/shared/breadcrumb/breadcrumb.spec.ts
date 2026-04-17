import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';

import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
      providers: [
        provideRouter([
          { path: 'a', children: [] },
          { path: 'b', children: [] },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
  });

  it('renders three items with nav aria-label', () => {
    fixture.componentRef.setInput('items', [
      { label: 'الرئيسية', route: '/' },
      { label: 'خدمة', route: '/service' },
      { label: 'التفاصيل' },
    ]);
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('[data-testid="breadcrumb"]'));
    expect(nav).toBeTruthy();
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('breadcrumb');

    const items = fixture.debugElement.queryAll(By.css('[data-testid="breadcrumb-item"]'));
    expect(items.length).toBe(3);
  });

  it('last item is plain text with aria-current and no routerLink', () => {
    fixture.componentRef.setInput('items', [
      { label: 'أول', route: '/a' },
      { label: 'ثانٍ', route: '/b' },
      { label: 'حالي' },
    ]);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('[data-testid="breadcrumb-item"]'));
    const last = items[2];
    expect(last.nativeElement.tagName.toLowerCase()).toBe('span');
    expect(last.nativeElement.getAttribute('aria-current')).toBe('page');
    expect(last.query(By.directive(RouterLink))).toBeNull();
  });

  it('first item uses routerLink', () => {
    fixture.componentRef.setInput('items', [
      { label: 'أول', route: '/a' },
      { label: 'ثانٍ', route: '/b' },
      { label: 'حالي' },
    ]);
    fixture.detectChanges();

    const first = fixture.debugElement.queryAll(By.css('[data-testid="breadcrumb-item"]'))[0];
    const routerLink = first.injector.get(RouterLink);
    expect(routerLink.urlTree?.toString()).toBe('/a');
  });
});
