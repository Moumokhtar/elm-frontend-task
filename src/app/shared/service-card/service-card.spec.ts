import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ServiceCard } from './service-card';

describe('ServiceCard', () => {
  let fixture: ComponentFixture<ServiceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCard);
  });

  function setupFullCard() {
    fixture.componentRef.setInput('title', 'عنوان البطاقة');
    fixture.componentRef.setInput('description', 'نص إضافي لمحتوى البطاقة');
    fixture.componentRef.setInput('tags', [
      { label: 'وسم', severity: 'success' },
      { label: 'وسم', severity: 'info' },
    ]);
    fixture.componentRef.setInput('primaryLabel', 'اجراء');
    fixture.componentRef.setInput('secondaryLabel', 'اجراء ثانوي');
    fixture.detectChanges();
  }

  it('renders icon, title, description, tags, and both buttons', () => {
    setupFullCard();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-title"]'))?.nativeElement.textContent).toContain(
      'عنوان البطاقة',
    );
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-description"]'))).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.css('[data-testid="service-card-tag"]')).length).toBe(2);
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-primary-btn"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-secondary-btn"]'))).toBeTruthy();
  });

  it('hides tags when tags input is empty', () => {
    fixture.componentRef.setInput('title', 'عنوان');
    fixture.componentRef.setInput('description', 'وصف');
    fixture.componentRef.setInput('tags', []);
    fixture.componentRef.setInput('primaryLabel', 'موافق');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-tags"]'))).toBeNull();
  });

  it('hides primary button when primaryLabel is empty', () => {
    fixture.componentRef.setInput('title', 'عنوان');
    fixture.componentRef.setInput('description', 'وصف');
    fixture.componentRef.setInput('secondaryLabel', 'ثانوي');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-primary-btn"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="service-card-secondary-btn"]'))).toBeTruthy();
  });

  it('emits primaryClick and secondaryClick', () => {
    setupFullCard();
    let primaryCount = 0;
    let secondaryCount = 0;
    fixture.componentInstance.primaryClick.subscribe(() => {
      primaryCount++;
    });
    fixture.componentInstance.secondaryClick.subscribe(() => {
      secondaryCount++;
    });

    fixture.debugElement
      .query(By.css('[data-testid="service-card-primary-btn"] button'))
      ?.nativeElement.click();
    fixture.debugElement
      .query(By.css('[data-testid="service-card-secondary-btn"] button'))
      ?.nativeElement.click();

    expect(primaryCount).toBe(1);
    expect(secondaryCount).toBe(1);
  });
});
