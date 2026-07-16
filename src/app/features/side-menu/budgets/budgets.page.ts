import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import {
  BudgetListItem,
  BudgetPeriod,
  BudgetSummary,
  ListBudgetsResponse
} from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { ListBudgetsUseCase } from 'src/app/core/use-cases/budgets/list-budgets.usecase';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    FeatureHeaderComponent,
    FilterModalComponent
  ]
})
export class BudgetsPage implements OnInit {
  selectedPeriod: BudgetPeriod = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  isPeriodSelectorOpen = false;
  isLoading = false;

  readonly currency: Currency = CURRENCIES.PEN;
  budgets: BudgetListItem[] = [];
  summary: BudgetSummary = {
    dateLabel: '',
    budgeted: 0,
    used: 0,
    percentage: 0
  };
  selectedDate = '';

  constructor(
    private readonly navService: NavigationService,
    private readonly listBudgetsUseCase: ListBudgetsUseCase
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  get selectedPeriodLabel(): string {
    return {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Periodo'
    }[this.selectedPeriod];
  }

  get summaryBalance(): number {
    return Math.abs(this.summary.budgeted - this.summary.used);
  }

  get summaryBalanceLabel(): string {
    return this.summary.used > this.summary.budgeted
      ? 'Monto excedido'
      : 'Saldo disponible';
  }

  get summaryProgress(): number {
    return Math.min(Math.max(this.summary.percentage, 0), 100);
  }

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  applyFilters(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    this.loadBudgets();
  }

  openBudget(budget: BudgetListItem): void {
    this.navService.forward('/budgets/detail', {
      budgetId: budget.id,
      frequency: this.selectedPeriod,
      period: this.selectedDate,
      currency: this.currency.code
    });
  }

  showArchivedBudgets(): void {
    console.log('Mostrar presupuestos archivados');
  }

  trackByBudget(_: number, budget: BudgetListItem): number {
    return budget.id;
  }

  private loadBudgets(): void {
    this.isLoading = true;

    this.listBudgetsUseCase.execute({
      period: this.selectedPeriod,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    }).subscribe({
      next: result => {
        this.isLoading = false;

        if (result.success && result.data) {
          this.setBudgetResponse(result.data);
          return;
        }

        this.clearBudgetData();
      },
      error: () => {
        this.isLoading = false;
        this.clearBudgetData();
      }
    });
  }

  private setBudgetResponse(response: ListBudgetsResponse): void {
    this.budgets = response.items;
    this.summary = response.summary;
    this.selectedDate = response.dateRangeLabel.replace(/^Semana:\s*/i, '');
  }

  private clearBudgetData(): void {
    this.budgets = [];
    this.summary = {
      dateLabel: '',
      budgeted: 0,
      used: 0,
      percentage: 0
    };
  }

  private getCurrentMonth(): string {
    return this.formatDateInput(new Date()).slice(0, 7);
  }

  private getFirstDayOfCurrentMonth(): string {
    const today = new Date();
    return this.formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  private getLastDayOfCurrentMonth(): string {
    const today = new Date();
    return this.formatDateInput(new Date(today.getFullYear(), today.getMonth() + 1, 0));
  }

  private formatDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
