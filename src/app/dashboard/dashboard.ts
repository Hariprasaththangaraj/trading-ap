import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';


import { ThemeService } from '../shared/theme-toggle/theme';



@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
    
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'

})

export class DashboardComponent {

  private themeService = inject(ThemeService);

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  constructor(

    private router: Router

  ) {

  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {

    this.router.navigate(['/login']);

  }

}