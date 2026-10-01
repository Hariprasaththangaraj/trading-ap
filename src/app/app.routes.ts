import { Routes } from '@angular/router';

import { Landing } from './landing/landing';
import { LoginComponent } from './auth/login/login';
import { LayoutComponent } from './layout/header/header';
import { SignupComponent } from './auth/signup/signup';

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
        path: 'layout',
        component: LayoutComponent
    }

];