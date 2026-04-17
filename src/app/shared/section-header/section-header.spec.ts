import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  let fixture: ComponentFixture<SectionHeader>;

  function setup(inputs: {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionRoute?: string | readonly (string | number)[];
  }) {
    fixture = TestBed.createComponent(SectionHeader);
    fixture.componentRef.setInput('title', inputs.title);
    if (inputs.subtitle !== undefined) fixture.componentRef.setInput('subtitle', inputs.subtitle);
    if (inputs.actionLabel !== undefined) fixture.componentRef.setInput('actionLabel', inputs.actionLabel);
    if (inputs.actionRoute !== undefined) fixture.componentRef.setInput('actionRoute', inputs.actionRoute);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeader],
      providers: [provideRouter([{ path: 'all', component: SectionHeader }])],
    }).compileComponents();
  });

  it('renders title as h2', () => {
    setup({ title: 'عنوان القسم' });
    const title = fixture.debugElement.query(By.css('[data-testid="section-header-title"]'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.tagName.toLowerCase()).toBe('h2');
    expect(title.nativeElement.textContent.trim()).toBe('عنوان القسم');
  });

  it('does not render subtitle or action when omitted', () => {
    setup({ title: 'عنوان فقط' });
    expect(fixture.debugElement.query(By.css('[data-testid="section-header-subtitle"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="section-header-action"]'))).toBeNull();
  });

  it('renders subtitle when provided', () => {
    setup({ title: 'عنوان', subtitle: 'نص فرعي يشرح القسم' });
    const sub = fixture.debugElement.query(By.css('[data-testid="section-header-subtitle"]'));
    expect(sub).toBeTruthy();
    expect(sub.nativeElement.textContent.trim()).toBe('نص فرعي يشرح القسم');
  });

  it('renders action button when actionLabel is set', () => {
    setup({ title: 'عنوان', actionLabel: 'عرض الكل' });
    const btn = fixture.debugElement.query(By.css('[data-testid="section-header-action"]'));
    expect(btn).toBeTruthy();
  });

  it('applies routerLink when actionRoute is set', () => {
    setup({ title: 'عنوان', actionLabel: 'عرض الكل', actionRoute: '/all' });
    const btn = fixture.debugElement.query(By.css('[data-testid="section-header-action"]'));
    expect(btn).toBeTruthy();
    const routerLink = btn.injector.get(RouterLink);
    expect(routerLink.urlTree?.toString()).toBe('/all');
  });

  it('does not render subtitle when empty string', () => {
    setup({ title: 'عنوان', subtitle: '' });
    expect(fixture.debugElement.query(By.css('[data-testid="section-header-subtitle"]'))).toBeNull();
  });
});
