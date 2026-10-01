import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'

})

export class DashboardComponent {

  isDarkMode = false;

  constructor(

    private router: Router

  ) {

  }

  toggleTheme(): void {

    this.isDarkMode = !this.isDarkMode;

  }

  logout(): void {

    this.router.navigate(['/login']);

  }

}