import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;

  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  login(): void {

    this.errorMessage = '';

    this.isLoading = true;

    this.authService.login(this.loginData)
      .subscribe({

        next: (response) => {

          this.isLoading = false;

          console.log('Login response:', response);

          this.router.navigate(['/dashboard']);

        },

        error: (error) => {

          this.isLoading = false;

          console.error('Login error:', error);

          this.errorMessage =
            error?.error?.message ||
            'Invalid username or password.';

        }

      });

  }

  goToSignup(): void {

    this.router.navigate(['/signup']);

  }

  goToHome(): void {

    this.router.navigate(['/']);

  }

}