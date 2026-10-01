import { Routes } from '@angular/router';

import { Landing } from './landing/landing';
import { LoginComponent } from './auth/login/login';
import { LayoutComponent } from './layout/header/header';
import { SignupComponent } from './auth/signup/signup';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [

    {
        path: '',
        component: Landing
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'signup',
        component: SignupComponent
    },

    {
      path: 'dashboard',
  component: DashboardComponent
},
    {
        path: 'layout',
        component: LayoutComponent
    }

];