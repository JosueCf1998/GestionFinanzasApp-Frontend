import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'welcome-step-one',
    loadComponent: () => import('./welcome/welcomeStepOne/welcome-step-one.page').then( m => m.WelcomeStepOnePage)
  },
  {
    path: 'welcome-step-two',
    loadComponent: () => import('./welcome/welcomeStepTwo/welcome-step-two.page').then( m => m.WelcomeStepTwoPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
];
