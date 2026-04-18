import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NewsCard } from './news-card';

describe('NewsCard', () => {
  let fixture: ComponentFixture<NewsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsCard);
  });

  function setup() {
    fixture.componentRef.setInput('imageSrc', 'images/news-card-placeholder.jpg');
    fixture.componentRef.setInput('imageAlt', 'صورة الغلاف');
    fixture.componentRef.setInput('title', 'عنوان الخبر');
    fixture.componentRef.setInput('body', 'نص مختصر للخبر يظهر في البطاقة.');
    fixture.detectChanges();
  }

  it('renders image, title, body, and read-more button', () => {
    setup();
    expect(fixture.debugElement.query(By.css('[data-testid="news-card"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="news-card-img"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="news-card-title"]'))?.nativeElement.textContent).toContain('عنوان الخبر');
    expect(fixture.debugElement.query(By.css('[data-testid="news-card-body"]'))?.nativeElement.textContent).toContain('نص مختصر');
    expect(fixture.debugElement.query(By.css('[data-testid="news-card-read-more"]'))).toBeTruthy();
  });

  it('emits readMore when read-more button is clicked', () => {
    setup();
    let count = 0;
    fixture.componentInstance.readMore.subscribe(() => {
      count++;
    });
    fixture.debugElement.query(By.css('[data-testid="news-card-read-more"] button'))?.nativeElement.click();
    expect(count).toBe(1);
  });
});
