import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageFeedbackBar } from './page-feedback-bar';

describe('PageFeedbackBar', () => {
  let fixture: ComponentFixture<PageFeedbackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFeedbackBar],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFeedbackBar);
  });

  it('renders question and both buttons', () => {
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
