import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = '/api/auth';

  constructor(private http: HttpClient) {
  }

  signup(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/signup`,
      data
    );
  }

  login(data: any): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/login`,
      data
    );
  }

}