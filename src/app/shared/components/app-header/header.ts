
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  @Output() themeToggle = new EventEmitter<void>();

  isDarkMode = false;

  constructor(private router: Router) {}

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeToggle.emit();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
