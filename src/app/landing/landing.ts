import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}