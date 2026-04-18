import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders M4 section landmarks', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="home-hero"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="home-about"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="home-services"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="home-news"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="home-partners"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="home-feedback"]'))).toBeTruthy();
  });

  it('renders four stat cards', () => {
    expect(fixture.debugElement.queryAll(By.css('[data-testid^="home-stat-"]')).length).toBe(4);
  });

  it('includes desktop news grid and mobile carousel containers', () => {
    const news = fixture.debugElement.query(By.css('[data-testid="home-news"]'));
    expect(news.query(By.css('.d-none.d-lg-block'))).toBeTruthy();
    expect(news.query(By.css('.d-lg-none'))).toBeTruthy();
  });
});
