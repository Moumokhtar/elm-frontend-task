import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
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
}
