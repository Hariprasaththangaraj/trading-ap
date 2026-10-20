
import { Routes } from '@angular/router';

import { Landing } from './landing/landing';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { AppLayout } from './layout/header/header';
import { DashboardComponent } from './dashboard/dashboard';
import { BrokerManagement } from './broker-management/broker-management';

export const routes: Routes = [

  // Public landing page
  {
    path: '',
    component: Landing,
    pathMatch: 'full'
  },

  // Authentication pages - no sidebar
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  // Common layout for trading pages
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'broker-management',
        component: BrokerManagement
      }
    ]
  },

  // Unknown routes
  {
    path: '**',
    redirectTo: ''
  }

];
