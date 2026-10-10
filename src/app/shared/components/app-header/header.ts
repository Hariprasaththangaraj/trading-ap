
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../theme-toggle/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  private themeService = inject(ThemeService);

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }
}
