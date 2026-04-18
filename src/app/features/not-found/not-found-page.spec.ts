import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders Arabic not-found copy', () => {
    const msg = fixture.debugElement.query(By.css('[data-testid="not-found-message"]'));
    expect(msg.nativeElement.textContent.trim()).toBe('الصفحة غير موجودة');
  });

  it('sets RTL on host', () => {
    expect(fixture.nativeElement.getAttribute('dir')).toBe('rtl');
  });
});
