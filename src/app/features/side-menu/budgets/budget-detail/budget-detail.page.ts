import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';

type BudgetStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';

interface Budget {
  id: number;
  name: string;
  currency: string;
  isRecurring: boolean;
  recurrenceLabel: string;
}

interface BudgetSummary {
  budgeted: number;
  used: number;
  progress: number;
  status: BudgetStatus;
  statusLabel: string;
}

interface BudgetAccount {
  id: number;
  name: string;
  typeLabel: string;
  currency: string;
  icon: string;
  color: string;
}

interface CategoryBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  percentage: number;
  status: BudgetStatus;
  statusLabel: string;
}

interface BudgetSuggestion {
  title: string;
  description: string;
}

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.page.html',
  styleUrls: ['./budget-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon
  ]
})
export class BudgetDetailPage {

  selectedPeriod = 'Julio 2026';

  budget: Budget = {
    id: 1,
    name: 'Presupuesto personal',
    currency: 'PEN',
    isRecurring: true,
    recurrenceLabel: 'Mensual'
  };

  summary: BudgetSummary = {
    budgeted: 3200,
    used: 3480.40,
    progress: 109,
    status: 'EXCEEDED',
    statusLabel: 'Excedido'
  };

  budgetAccounts: BudgetAccount[] = [
    {
      id: 1,
      name: 'Cuenta principal',
      typeLabel: 'Cuenta de ahorros',
      currency: 'PEN',
      icon: 'bank',
      color: 'var(--fv-category-home, #4361ee)'
    },
    {
      id: 2,
      name: 'Efectivo',
      typeLabel: 'Dinero en efectivo',
      currency: 'PEN',
      icon: 'wallet',
      color: 'var(--fv-category-transport, #8b5cf6)'
    }
  ];

  categoryBudgets: CategoryBudget[] = [
    {
      id: 1,
      name: 'Alimentación',
      icon: 'restaurant',
      color: 'var(--fv-category-food, #f59e0b)',
      budgeted: 800,
      used: 640,
      percentage: 80,
      status: 'ON_TRACK',
      statusLabel: 'En objetivo'
    },
    {
      id: 2,
      name: 'Transporte',
      icon: 'bus',
      color: 'var(--fv-category-transport, #8b5cf6)',
      budgeted: 400,
      used: 380,
      percentage: 95,
      status: 'WARNING',
      statusLabel: 'Cerca del límite'
    },
    {
      id: 3,
      name: 'Vivienda',
      icon: 'home',
      color: 'var(--fv-category-home, #4361ee)',
      budgeted: 700,
      used: 700,
      percentage: 100,
      status: 'WARNING',
      statusLabel: 'Límite alcanzado'
    },
    {
      id: 4,
      name: 'Entretenimiento',
      icon: 'gym',
      color: 'var(--fv-category-entertainment, #ec4899)',
      budgeted: 250,
      used: 340,
      percentage: 136,
      status: 'EXCEEDED',
      statusLabel: 'Excedido'
    },
    {
      id: 5,
      name: 'Salud',
      icon: 'health',
      color: 'var(--fv-category-health, #10b981)',
      budgeted: 300,
      used: 54,
      percentage: 18,
      status: 'ON_TRACK',
      statusLabel: 'En objetivo'
    }
  ];

  suggestion: BudgetSuggestion | null = {
    title: 'Revisa tus gastos en entretenimiento',
    description: 'Esta categoría superó el monto asignado para el periodo actual.'
  };

  constructor(
    private readonly navService: NavigationService
  ) {}

  // MARK: - ESTADO

  get hasExceededBudget(): boolean {
    return this.summary.status === 'EXCEEDED';
  }

  // MARK: - PERIODO

  openPeriodSelector(): void {
    console.log('Abrir selector de periodo');
  }

  // MARK: - NAVEGACIÓN

  goToEditBudget(): void {
    this.navService.forward('/main/budgets/edit', {
      budgetId: this.budget.id
    });
  }

  goToEditAccounts(): void {
    this.navService.forward('/main/budgets/edit-accounts', {
      budgetId: this.budget.id
    });
  }

  goToBudgetCategories(): void {
    this.navService.forward('/main/budgets/categories', {
      budgetId: this.budget.id
    });
  }

  goToBudgetCategoryDetail(category: CategoryBudget): void {
    this.navService.forward('/main/budgets/category-detail', {
      budgetId: this.budget.id,
      categoryId: category.id
    });
  }

  archiveBudget(): void {
    console.log('Archivar presupuesto', this.budget.id);
  }

  // MARK: - TRACKING

  trackByAccount(_: number, account: BudgetAccount): number {
    return account.id;
  }

  trackByCategory(_: number, category: CategoryBudget): number {
    return category.id;
  }
}
