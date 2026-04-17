import { Component, HostListener, signal, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

interface NavItem {
  label: string;
}

interface NavAction {
  label: string;
  iconClass: string;
  testId: string;
}

@Component({
  selector: 'app-navbar',
  imports: [Menu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @ViewChild('desktopMenu') desktopMenu?: Menu;

  readonly openMenuIndex = signal<number | null>(null);

  readonly menuItems: readonly NavItem[] = [
    { label: 'تبويب 1' },
    { label: 'تبويب 2' },
    { label: 'تبويب 3' },
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

  @HostListener('document:keydown.escape', ['$event'])
  onDocumentEscape(event: Event): void {
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
