import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/app-header/header';

@Component({
  selector: 'app-broker-management',
  standalone: true,
  imports: [RouterLink,
    HeaderComponent
  ],
  templateUrl: './broker-management.html',
  styleUrl: './broker-management.css',

})
export class BrokerManagement {

}
