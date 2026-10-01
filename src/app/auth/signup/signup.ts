import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  signupData = {
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: ''
  };

  confirmPassword = '';

  isLoading = false;

  errorMessage = '';

  successMessage = '';


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }


  signup(): void {

    this.errorMessage = '';
    this.successMessage = '';


    // Password validation
    if (this.signupData.password !== this.confirmPassword) {

      this.errorMessage = 'Passwords do not match.';

      return;
    }


    this.isLoading = true;


    this.authService.signup(this.signupData)
      .subscribe({

        next: (response) => {

          this.isLoading = false;
  console.log('Signup response:', response);

  this.router.navigate(['/login']);

        },

        error: (error) => {

          this.isLoading = false;

          console.error('Signup error:', error);

          this.errorMessage =
            error?.error?.message ||
            'Unable to create account. Please try again.';

        }

      });

  }


  goToHome(): void {

    this.router.navigate(['/']);

  }


  goToLogin(): void {

    this.router.navigate(['/login']);

  }

}