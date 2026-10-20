import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';



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


  constructor(

    private router: Router

  ) {}
  logout(): void {

    this.router.navigate(['/login']);

  }

}