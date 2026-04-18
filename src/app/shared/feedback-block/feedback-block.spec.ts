import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FeedbackBlock } from './feedback-block';

describe('FeedbackBlock', () => {
  let fixture: ComponentFixture<FeedbackBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackBlock);
  });

  it('by default renders only the helpfulness row (required stack)', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-block"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="page-feedback-bar"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-rate-service-btn"]'))).toBeNull();
  });

  it('hides helpfulness row when showHelpfulnessRow is false', () => {
    fixture.componentRef.setInput('showHelpfulnessRow', false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="page-feedback-bar"]'))).toBeNull();
  });

  it('sets dir and lang on the stack root for RTL', () => {
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.css('[data-testid="feedback-block"]'))
      ?.nativeElement as HTMLElement;
    expect(root?.getAttribute('dir')).toBe('rtl');
    expect(root?.getAttribute('lang')).toBe('ar');
  });

  it('optional last-modified row when showLastModifiedRow is true', () => {
    fixture.componentRef.setInput('showLastModifiedRow', true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('تاريخ آخر تعديل');
  });

  it('last-modified strip defaults to end alignment (justify + text)', () => {
    fixture.componentRef.setInput('showLastModifiedRow', true);
    fixture.detectChanges();
    const strip = fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))
      ?.parent?.nativeElement as HTMLElement;
    const p = fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))
      ?.nativeElement as HTMLElement;
    expect(strip.classList.contains('justify-content-end')).toBe(true);
    expect(strip.classList.contains('justify-content-start')).toBe(false);
    expect(p.classList.contains('text-end')).toBe(true);
    expect(p.classList.contains('text-start')).toBe(false);
  });

  it('last-modified strip aligns start when showLastModifiedRowAlign is start', () => {
    fixture.componentRef.setInput('showLastModifiedRow', true);
    fixture.componentRef.setInput('showLastModifiedRowAlign', 'start');
    fixture.detectChanges();
    const strip = fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))
      ?.parent?.nativeElement as HTMLElement;
    const p = fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))
      ?.nativeElement as HTMLElement;
    expect(strip.classList.contains('justify-content-start')).toBe(true);
    expect(strip.classList.contains('justify-content-end')).toBe(false);
    expect(p.classList.contains('text-start')).toBe(true);
    expect(p.classList.contains('text-end')).toBe(false);
  });

  it('optional service rating row when showServiceRatingRow is true', () => {
    fixture.componentRef.setInput('showServiceRatingRow', true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-rate-service-btn"]'))).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('قيم هذه الخدمة');
  });

  it('full Figma stack when both optional rows are enabled', () => {
    fixture.componentRef.setInput('showLastModifiedRow', true);
    fixture.componentRef.setInput('showServiceRatingRow', true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-last-modified"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-rate-service-btn"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="page-feedback-bar"]'))).toBeTruthy();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.textContent).toContain('تم تقييم هذه الخدمة بمتوسط');
  });

  it('forwards seed counts to the helpfulness stats line', () => {
    fixture.componentRef.setInput('seedYes', 5);
    fixture.componentRef.setInput('seedNo', 2);
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('[data-testid="feedback-count"]'));
    expect(count).toBeTruthy();
    expect(count.nativeElement.textContent).toContain('7');
    expect(count.nativeElement.textContent).toContain('تعليق');
  });

  it('renders question and both vote buttons', () => {
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.css('[data-testid="page-feedback-bar"]'));
    expect(root).toBeTruthy();
    expect(root.nativeElement.textContent).toContain('هل كانت هذه الصفحة مفيدة؟');
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-yes-btn"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-no-btn"]'))).toBeTruthy();
  });

  it('shows stats line when seed data exists', () => {
    fixture.componentRef.setInput('seedYes', 3);
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('[data-testid="feedback-count"]'));
    expect(count).toBeTruthy();
    expect(count.nativeElement.textContent).toContain('100');
    expect(count.nativeElement.textContent).toContain('%');
    expect(count.nativeElement.textContent).toContain('3');
    expect(count.nativeElement.textContent).toContain('تعليق');
  });

  it('increments yes and locks buttons after نعم', () => {
    fixture.componentRef.setInput('seedYes', 1);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('[data-testid="feedback-yes-btn"] button'))?.nativeElement.click();
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('[data-testid="feedback-count"]'));
    expect(count.nativeElement.textContent).toContain('2');
    const yesBtn = fixture.debugElement.query(By.css('[data-testid="feedback-yes-btn"] button'))?.nativeElement;
    const noBtn = fixture.debugElement.query(By.css('[data-testid="feedback-no-btn"] button'))?.nativeElement;
    expect(yesBtn?.disabled).toBe(true);
    expect(noBtn?.disabled).toBe(true);
  });

  it('increments no and shows stats after لا from zero seeds', () => {
    fixture.componentRef.setInput('seedYes', 0);
    fixture.componentRef.setInput('seedNo', 0);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-count"]'))).toBeNull();
    fixture.debugElement.query(By.css('[data-testid="feedback-no-btn"] button'))?.nativeElement.click();
    fixture.detectChanges();
    const yesBtn = fixture.debugElement.query(By.css('[data-testid="feedback-yes-btn"] button'))?.nativeElement;
    const noBtn = fixture.debugElement.query(By.css('[data-testid="feedback-no-btn"] button'))?.nativeElement;
    expect(yesBtn?.disabled).toBe(true);
    expect(noBtn?.disabled).toBe(true);
    const count = fixture.debugElement.query(By.css('[data-testid="feedback-count"]'));
    expect(count).toBeTruthy();
    expect(count.nativeElement.textContent).toContain('0%');
    expect(count.nativeElement.textContent).toContain('1');
  });

  it('prevents a second vote after نعم', () => {
    fixture.componentRef.setInput('seedYes', 0);
    fixture.detectChanges();
    const yes = fixture.debugElement.query(By.css('[data-testid="feedback-yes-btn"] button'))?.nativeElement;
    yes?.click();
    fixture.detectChanges();
    yes?.click();
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('[data-testid="feedback-count"]'));
    expect(count.nativeElement.textContent).toContain('100');
    expect(count.nativeElement.textContent).toContain('1');
  });
});
