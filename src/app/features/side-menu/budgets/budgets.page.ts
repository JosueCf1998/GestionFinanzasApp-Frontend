import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';

interface BudgetSummary {
  income: number;
  budgeted: number;
  spent: number;
  available: number;
  exceeded: number;
  progress: number;
}

interface CategoryBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  budget: number;
  spent: number;
  remaining: number;
  percentage: number;
}

interface BudgetSuggestion {
  title: string;
  description: string;
}

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent
  ]
})
export class BudgetsPage {

  selectedMonth = 'Julio 2026';

  summary: BudgetSummary = {
    income: 2000,
    budgeted: 3200,
    spent: 2180.40,
    available: -180.40,
    exceeded: 180.40,
    progress: 109
  };

  categoryBudgets: CategoryBudget[] = [
    {
      id: 1,
      name: 'Alimentación',
      icon: 'restaurant',
      color: 'var(--fv-category-food)',
      budget: 800,
      spent: 640,
      remaining: 160,
      percentage: 80
    },
    {
      id: 2,
      name: 'Transporte',
      icon: 'bus',
      color: 'var(--fv-category-transport)',
      budget: 400,
      spent: 380,
      remaining: 20,
      percentage: 95
    },
    {
      id: 3,
      name: 'Vivienda',
      icon: 'home',
      color: 'var(--fv-category-home)',
      budget: 700,
      spent: 700,
      remaining: 0,
      percentage: 100
    },
    {
      id: 4,
      name: 'Entretenimiento',
      icon: 'gym',
      color: 'var(--fv-category-entertainment)',
      budget: 250,
      spent: 340,
      remaining: -90,
      percentage: 136
    },
    {
      id: 5,
      name: 'Salud',
      icon: 'health',
      color: 'var(--fv-category-health)',
      budget: 300,
      spent: 54,
      remaining: 246,
      percentage: 18
    }
  ];

  suggestion: BudgetSuggestion = {
    title: 'Reduce tus gastos en entretenimiento',
    description: 'Esta categoría superó en 36% el presupuesto establecido para este mes.'
  };

  constructor(
    private readonly navService: NavigationService
  ) {}

  // MARK: - ESTADO

  get hasExceededBudget(): boolean {
    return this.summary.available < 0;
  }

  // MARK: - NAVEGACIÓN

  goToCreateBudget() {
    this.navService.forward('/main/budgets/create');
  }

  goToBudgetsDetail() {
    this.navService.forward('/main/budgets/detail');
  }

  goToBudgetDetail(category: CategoryBudget) {
    this.navService.forward('/main/budgets/category-detail', {
      category
    });
  }

  openMonthSelector() {
    console.log('Abrir selector de periodo');
  }

  // MARK: - TRACKING

  trackByCategory(_: number, category: CategoryBudget): number {
    return category.id;
  }
}
