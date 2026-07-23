import { CreateTransacPage } from './features/side-menu/home/create-transac/create-transac.page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  // PRE-LOGIN ROUTES
  {
    path: 'splash',
    loadComponent: () => import('./features/auth/splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'login-recurrent',
    loadComponent: () => import('./features/auth/login-recurrent/login-recurrent.page').then(m => m.LoginRecurrentPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  // POST-LOGIN ROUTES
  {
    path: 'welcome-step-one',
    loadComponent: () => import('./features/welcome/welcomeStepOne/welcome-step-one.page').then(m => m.WelcomeStepOnePage)
  },
  {
    path: 'welcome-step-two',
    loadComponent: () => import('./features/welcome/welcomeStepTwo/welcome-step-two.page').then(m => m.WelcomeStepTwoPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./features/side-menu/side-menu.page').then(m => m.SideMenuPage),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/side-menu/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'graphics',
        loadComponent: () => import('./features/side-menu/graphics/graphics.page').then(m => m.GraphicsPage)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/side-menu/categories/categories.page').then(m => m.CategoriesPage)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./features/side-menu/accounts/accounts.page').then(m => m.AccountsPage)
      },
      {
        path: 'budgets',
        loadComponent: () => import('./features/side-menu/budgets/budgets.page').then(m => m.BudgetsPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/side-menu/profile/profile.page').then(m => m.ProfilePage)
      }
    ],
  },
  // BUDGET ROUTES
  {
    path: 'budgets/detail/:id',
    loadComponent: () => import('./features/side-menu/budgets/detail-budget/detail-budget.page').then(m => m.DetailBudgetPage)
  },
  {
    path: 'budgets/create',
    loadComponent: () => import('./features/side-menu/budgets/create-budget/create-budget.page').then(m => m.CreateBudgetPage)
  },
  // TRANSACTION ROUTES
  {
    path: 'home/create',
    loadComponent: () => import('./features/side-menu/home/create-transac/create-transac.page').then(m => m.CreateTransacPage)
  },
  {
    path: 'home/edit',
    loadComponent: () => import('./features/side-menu/home/create-transac/create-transac.page').then(m => m.CreateTransacPage)
  },
  // CATEGORIES ROUTES
  {
    path: 'categories/edit',
    loadComponent: () => import('./features/side-menu/categories/edit-categories/edit-categories.page').then(m => m.EditCategoriesPage)
  },
  {
    path: 'categories/create',
    loadComponent: () => import('./features/side-menu/categories/create-categories/create-categories.page').then(m => m.CreateCategoriesPage)
  },
  // ACCOUNTS ROUTES
  {
    path: 'accounts/create-account',
    loadComponent: () => import('./features/side-menu/accounts/create-account/create-account.page').then(m => m.CreateAccountPage)
  },
  // TRANSFER ROUTES
  {
    path: 'accounts/history-transfer',
    loadComponent: () => import('./features/side-menu/accounts/history-transfer/history-transfer.page').then(m => m.HistoryTransferPage)
  },
  {
    path: 'accounts/new-transfer',
    loadComponent: () => import('./features/side-menu/accounts/new-transfer/new-transfer.page').then(m => m.NewTransferPage)
  },
  {
    path: 'accounts/detail-transfer',
    loadComponent: () => import('./features/side-menu/accounts/detail-transfer/detail-transfer.page').then(m => m.DetailTransferPage)
  },
  // PRUEBA ROUTES - Testing navigation
  {
    path: 'prueba/screen-one',
    loadComponent: () => import('./features/prueba/screen-one/screen-one.page').then(m => m.ScreenOnePage)
  },
  {
    path: 'prueba/screen-two',
    loadComponent: () => import('./features/prueba/screen-two/screen-two.page').then(m => m.ScreenTwoPage)
  },
  {
    path: 'prueba/screen-three',
    loadComponent: () => import('./features/prueba/screen-three/screen-three.page').then(m => m.ScreenThreePage)
  },
  // Wildcard para rutas no encontradas (opcional, recomendado en producción)
  {
    path: '**',
    redirectTo: 'login'
  }
];
