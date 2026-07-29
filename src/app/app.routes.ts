import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/header/header';
import { LoginComponent } from './auth/login/login';
  
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'layout',
        component: LayoutComponent
    }
];
