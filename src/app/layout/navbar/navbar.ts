import { Component, HostListener, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

interface NavItem {
  label: string;
  route?: string;
}

interface NavAction {
  label: string;
  iconClass: string;
  testId: string;
}

@Component({
  selector: 'app-navbar',
  imports: [Menu, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @ViewChild('desktopMenu') desktopMenu?: Menu;

  readonly openMenuIndex = signal<number | null>(null);
  readonly mobileMenuOpen = signal(false);
  readonly mobileExpandedIndex = signal<number | null>(null);

  readonly menuItems: readonly NavItem[] = [
    { label: 'الرئيسية', route: '/' },
    { label: 'الخدمات', route: '/service' },
    { label: 'حقول النص', route: '/form' },
    { label: 'تبويب 4' },
    { label: 'تبويب 5' },
    { label: 'تبويب 6' },
    { label: 'تبويب 7' },
  ];

  readonly actions: readonly NavAction[] = [
    { label: 'البحث', iconClass: 'pi pi-search', testId: 'action-search' },
    { label: 'English', iconClass: 'pi pi-language', testId: 'action-language' },
    { label: 'تسجيل الدخول', iconClass: 'pi pi-user', testId: 'action-login' },
  ];

  readonly submenuItems: MenuItem[] = [
    { label: 'عنصر فرعي 1' },
    { label: 'عنصر فرعي 2' },
    { label: 'عنصر فرعي 3' },
  ];

  private lastTriggerButton: HTMLButtonElement | null = null;
  private pendingMenuOpen: { index: number; triggerButton: HTMLButtonElement } | null = null;

  constructor() {
    const router = inject(Router);
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.mobileMenuOpen()) {
          this.closeMobileMenu();
        }
      });
  }

  onMenuTriggerClick(event: MouseEvent, index: number, triggerButton: HTMLButtonElement): void {
    this.lastTriggerButton = triggerButton;
    const isSameMenu = this.openMenuIndex() === index;

    if (isSameMenu) {
      this.pendingMenuOpen = null;
      this.desktopMenu?.hide();
      this.openMenuIndex.set(null);
      return;
    }

    if (this.openMenuIndex() !== null) {
      // Close current first, then open requested one in onMenuHide.
      this.pendingMenuOpen = { index, triggerButton };
      this.desktopMenu?.hide();
      this.openMenuIndex.set(index);
      return;
    }

    this.openMenuIndex.set(index);
    this.pendingMenuOpen = null;
    this.openMenuForTrigger(triggerButton);
  }

  onMenuHide(): void {
    if (this.pendingMenuOpen) {
      const nextMenu = this.pendingMenuOpen;
      this.pendingMenuOpen = null;
      this.openMenuIndex.set(nextMenu.index);
      this.openMenuForTrigger(nextMenu.triggerButton);
      return;
    }

    this.openMenuIndex.set(null);
  }

  toggleMobileMenu(): void {
    const next = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(next);
    if (!next) {
      this.mobileExpandedIndex.set(null);
    }
  }

  toggleMobileSubmenu(index: number): void {
    this.mobileExpandedIndex.update((current) => (current === index ? null : index));
  }

  private closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.mobileExpandedIndex.set(null);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onDocumentEscape(event: Event): void {
    if (this.mobileMenuOpen()) {
      event.preventDefault();
      this.closeMobileMenu();
      return;
    }

    if (this.openMenuIndex() === null) {
      return;
    }

    event.preventDefault();
    this.pendingMenuOpen = null;
    this.desktopMenu?.hide();
    this.openMenuIndex.set(null);
    this.lastTriggerButton?.focus();
  }

  private openMenuForTrigger(triggerButton: HTMLButtonElement): void {
    this.desktopMenu?.show({
      currentTarget: triggerButton,
      target: triggerButton,
    } as unknown as MouseEvent);
  }
}
