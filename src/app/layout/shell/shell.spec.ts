import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Shell } from './shell';

describe('Shell', () => {
  let component: Shell;
  let fixture: ComponentFixture<Shell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Shell);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders header, main, and footer slots', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="shell-header"]'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shell-main"]'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shell-footer"]'))).not.toBeNull();
  });

  it('exposes a skip link targeting main and a focusable main landmark', () => {
    const skip = fixture.debugElement.query(By.css('[data-testid="shell-skip-link"]'));
    expect(skip).not.toBeNull();
    expect(skip.nativeElement.getAttribute('href')).toBe('#main-content');

    const main = fixture.debugElement.query(By.css('[data-testid="shell-main"]'));
    expect(main.nativeElement.getAttribute('id')).toBe('main-content');
    expect(main.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('uses a wrapper div for the footer slot so app-footer owns the footer landmark', () => {
    const slot = fixture.debugElement.query(By.css('[data-testid="shell-footer"]'));
    expect(slot.nativeElement.tagName.toLowerCase()).toBe('div');
    expect(slot.query(By.css('app-footer'))).not.toBeNull();
  });


  it('places router-outlet inside main', () => {
    const main = fixture.debugElement.query(By.css('[data-testid="shell-main"]'));
    expect(main.query(By.css('router-outlet'))).not.toBeNull();
  });

  it('uses column flex layout on host so main can grow and footer stays at bottom', () => {
    const host = fixture.nativeElement as HTMLElement;
    const styles = window.getComputedStyle(host);
    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('column');
  });
});
