import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, timer, exhaustMap, catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  private http = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  private pollingSub?: Subscription;

  crudeOil = signal<any>(null);
  errorMessage = signal('');
  isRunning = signal(false);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopPolling());
  }

  startPolling(): void {
    if (this.isRunning()) return;

    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.errorMessage.set('Token இல்லை. மீண்டும் login செய்யவும்.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.isRunning.set(true);
    this.errorMessage.set('');

    this.pollingSub = timer(0, 3000)
      .pipe(
        exhaustMap(() =>
          this.http.get<any>('/api/dashboard/crudeoil', { headers }).pipe(
            catchError(err => {
              console.error('Crude oil API error:', err.status, err);

              if (err.status === 401 || err.status === 403) {
                this.errorMessage.set(
                  `Backend ${err.status} கொடுத்தது (Access denied). Token அல்லது Security config சரிபார்க்கவும்.`
                );
                this.stopPolling();
              } else {
                this.errorMessage.set(`Error ${err.status}: Data load ஆகவில்லை`);
              }
              return EMPTY;
            })
          )
        )
      )
      .subscribe({
        next: data => {

          const newLtp = data?.ltp;

          if (
            newLtp !== null &&
            newLtp !== undefined &&
            newLtp !== ''
          ) {

            this.crudeOil.update(current => ({
              ...current,
              ...data
            }));

          }

          this.errorMessage.set('');
        }
      });
  }

  stopPolling(): void {
    this.pollingSub?.unsubscribe();
    this.pollingSub = undefined;
    this.isRunning.set(false);
  }

  logout(): void {
    this.stopPolling();
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}