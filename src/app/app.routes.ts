import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'welcome-step-one',
    loadComponent: () => import('./features/welcome/welcomeStepOne/welcome-step-one.page').then( m => m.WelcomeStepOnePage)
  },
  {
    path: 'welcome-step-two',
    loadComponent: () => import('./features/welcome/welcomeStepTwo/welcome-step-two.page').then( m => m.WelcomeStepTwoPage)
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./features/side-menu/side-menu.page').then((m) => m.SideMenuPage),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/side-menu/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'graphics',
        loadComponent: () => import('./features/side-menu/graphics/graphics.page').then( m => m.GraphicsPage)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/side-menu/categories/categories.page').then( m => m.CategoriesPage)
      },
    ],
  },
];
