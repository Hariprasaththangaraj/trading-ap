
import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private document = inject(DOCUMENT);

  isDarkMode = signal(false);

  toggleTheme(): void {
    const darkMode = !this.isDarkMode();

    this.isDarkMode.set(darkMode);

    this.document.documentElement.classList.toggle(
      'dark-theme',
      darkMode
    );
  }
}
