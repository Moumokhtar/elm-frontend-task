import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { FormPage } from './form-page';

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

describe('FormPage', () => {
  let fixture: ComponentFixture<FormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPage);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders scaffold, heading, required notice, and Figma node on root', () => {
    const root = fixture.debugElement.query(By.css('[data-testid="form-page"]'));
    expect(root).toBeTruthy();
    expect(root.nativeElement.getAttribute('data-figma-node')).toBe('2036:75327');
    expect(fixture.debugElement.query(By.css('[data-testid="form-page-heading"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="form-page-required-notice"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="breadcrumb"]'))).toBeTruthy();
  });

  it('renders desktop stepper and mobile progress', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="form-page-stepper"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="form-page-mobile-progress"]'))).toBeTruthy();
  });

  it('exposes mobile progress as a live status region', () => {
    const el = fixture.debugElement.query(By.css('[data-testid="form-page-mobile-progress"]')).nativeElement;
    expect(el.getAttribute('role')).toBe('status');
    expect(el.getAttribute('aria-live')).toBe('polite');
  });

  it('sets aria-current step on the active step list item', () => {
    const current = fixture.nativeElement.querySelector('[role="listitem"][aria-current="step"]');
    expect(current).toBeTruthy();
    expect(current!.textContent).toContain('الخطوة الثانية');
  });

  it('marks required field inputs with aria-required', () => {
    const req = fixture.debugElement.query(By.css('#form-req-plain')).nativeElement;
    expect(req.getAttribute('aria-required')).toBe('true');
  });

  it('associates the form with the page heading', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(form.getAttribute('aria-labelledby')).toBe('form-page-heading');
    expect(fixture.debugElement.query(By.css('#form-page-heading'))).toBeTruthy();
  });

  it('renders actions and feedback block', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="form-btn-next"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="form-btn-back"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="feedback-block"]'))).toBeTruthy();
  });

  it('shows required field error after التالي when empty', () => {
    fixture.componentInstance.onNext();
    fixture.detectChanges();
    const req = fixture.debugElement.query(By.css('#form-req-plain'));
    expect(req.nativeElement.classList.contains('is-invalid')).toBe(true);
    expect(req.nativeElement.getAttribute('aria-invalid')).toBe('true');
    expect(req.nativeElement.getAttribute('aria-describedby')).toBe('err-req-plain');
    expect(fixture.debugElement.query(By.css('#err-req-plain'))).toBeTruthy();
  });

  it('moves to previous step on رجوع and shows placeholder for step 1', () => {
    expect(fixture.componentInstance.activeStepIndex()).toBe(1);
    fixture.componentInstance.onBack();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeStepIndex()).toBe(0);
    expect(fixture.debugElement.query(By.css('[data-testid="form-step-placeholder-0"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#form-req-plain'))).toBeFalsy();
  });

  it('advances past fields step when form is valid', () => {
    fixture.componentInstance.form.patchValue({
      reqPlain: 'a',
      reqSearch: 'b',
      reqPrefix: 'c',
      reqSuffix: 'd',
      reqHelper: 'e',
    });
    fixture.componentInstance.onNext();
    fixture.detectChanges();
    expect(fixture.componentInstance.activeStepIndex()).toBe(2);
    expect(fixture.debugElement.query(By.css('[data-testid="form-step-placeholder-2"]'))).toBeTruthy();
  });
});
