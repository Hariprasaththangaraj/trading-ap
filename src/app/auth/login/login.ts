import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
 
  private http = inject(HttpClient); 
  
  connectBroker() {

      console.log("Button clicked");

    this.http.get(environment.baseUrl + '/' + environment.loginUrl,
      { responseType: 'text' })
      .subscribe((response: string) => {
            window.location.href = response;
      });
  }

}
