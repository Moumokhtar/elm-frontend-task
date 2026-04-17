import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PartnerLogo } from './partner-logo';

describe('PartnerLogo', () => {
  let fixture: ComponentFixture<PartnerLogo>;

  function setup(inputs: { logoSrc?: string; logoAlt?: string; label?: string }) {
    fixture = TestBed.createComponent(PartnerLogo);
    if (inputs.logoSrc !== undefined) fixture.componentRef.setInput('logoSrc', inputs.logoSrc);
    if (inputs.logoAlt !== undefined) fixture.componentRef.setInput('logoAlt', inputs.logoAlt);
    if (inputs.label !== undefined) fixture.componentRef.setInput('label', inputs.label);
    fixture.detectChanges();
  }

  it('renders nothing when logoSrc is empty', () => {
    setup({});
    expect(fixture.debugElement.query(By.css('[data-testid="partner-logo"]'))).toBeNull();
  });

  it('renders card when logoSrc is provided', () => {
    setup({ logoSrc: '/test.png', logoAlt: 'Test logo' });
    expect(fixture.debugElement.query(By.css('[data-testid="partner-logo"]'))).toBeTruthy();
  });

  it('does not render label when label is empty', () => {
    setup({ logoSrc: '/test.png', logoAlt: 'Test logo' });
    expect(fixture.debugElement.query(By.css('[data-testid="partner-logo-label"]'))).toBeNull();
  });

  it('renders label when provided', () => {
    setup({ logoSrc: '/test.png', logoAlt: 'Test logo', label: 'شعار المنصة' });
    const label = fixture.debugElement.query(By.css('[data-testid="partner-logo-label"]'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('شعار المنصة');
  });
});
