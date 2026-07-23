import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import 'src/app/core/utils/observable-extensions';
import {
  BudgetListItem,
  PeriodPreset,
  BudgetSummary,
  ListBudgetsRequest,
  ListBudgetsResponse
} from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { ListBudgetsUseCase } from 'src/app/core/use-cases/budgets/list-budgets.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { BudgetListItemComponent } from 'src/app/shared/components/budget-list-item/budget-list-item.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
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
    ButtonComponent,
    BudgetListItemComponent,
    FeatureHeaderComponent,
    ItemIconComponent,
    FilterModalComponent,
    FloatingActionButtonComponent,
    BudgetSummaryCardComponent
  ]
})
export class BudgetsPage implements OnInit, OnDestroy {
  private budgetRequest?: Subscription;

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  isPeriodSelectorOpen = false;

  readonly currency: Currency = CURRENCIES.PEN;
  budgets: BudgetListItem[] = [];
  summary: BudgetSummary = {
    budgeted: 0,
    used: 0,
    percentage: 0
  };
  selectedDate = '';

  constructor(
    private readonly navService: NavigationService,
    private readonly listBudgetsUseCase: ListBudgetsUseCase,
    public readonly loadingService: SpinnerService
  ) {}

  // MARK: - CICLO DE VIDA

  ngOnInit(): void {
    this.loadBudgets();
  }

  ngOnDestroy(): void {
    this.budgetRequest?.unsubscribe();
    this.loadingService.hide();
  }

  // MARK: - SERVICIOS

  private loadBudgets(): void {
    const request = this.buildRequest();

    if (!request) {
      this.clearBudgetData();
      return;
    }

    this.budgetRequest?.unsubscribe();
    this.loadingService.show();

    this.budgetRequest = this.listBudgetsUseCase
      .execute(request)
      .service({
        success: data => {
          this.loadingService.hide();

          if (data) {
            this.setBudgetResponse(data);
            return;
          }

          this.clearBudgetData();
        },
        failure: () => {
          this.loadingService.hide();
          this.clearBudgetData();
        }
      });
  }

  // MARK: - PRESENTACIÓN

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
    if (!this.isValidSelection(selection)) {
      return;
    }

    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    this.loadBudgets();
  }

  openBudget(budget: BudgetListItem): void {
    this.navService.forward(`/budgets/detail/${budget.id}`, {
      budget,
      currency: this.currency.code,
      dateRangeLabel: this.selectedDate
    });
  }

  createBudget(): void {
    this.navService.forward('/budgets/create');
  }

  trackByBudget(_: number, budget: BudgetListItem): number {
    return budget.id;
  }

  private buildRequest(): ListBudgetsRequest | null {
    const request: ListBudgetsRequest = {
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    };

    return this.isValidSelection(request) ? request : null;
  }

  private isValidSelection(
    selection: Pick<FilterSelection, 'startDate' | 'endDate'>
  ): boolean {
    return this.isIsoDate(selection.startDate) &&
      this.isIsoDate(selection.endDate) &&
      selection.startDate <= selection.endDate;
  }

  private isIsoDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    return !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
  }

  private setBudgetResponse(response: ListBudgetsResponse): void {
    this.budgets = [...response.items];
    this.summary = { ...response.summary };
    this.selectedDate = response.dateRangeLabel;
  }

  private clearBudgetData(): void {
    this.budgets = [];
    this.summary = {
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
