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
import { FeatureFilterStateService } from 'src/app/core/services/feature-filter-state.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { ListBudgetsUseCase } from 'src/app/core/use-cases/budgets/list-budgets.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { ProgressListItemComponent } from 'src/app/shared/components/progress-list-item/progress-list-item.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { ListSkeletonComponent } from 'src/app/shared/components/list-skeleton/list-skeleton.component';
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
    ProgressListItemComponent,
    FeatureHeaderComponent,
    ItemIconComponent,
    FilterModalComponent,
    FloatingActionButtonComponent,
    BudgetSummaryCardComponent,
    SectionCardComponent,
    ListSkeletonComponent
  ]
})
export class BudgetsPage implements OnInit, OnDestroy {
  private budgetRequest?: Subscription;
  private filterResetSubscription?: Subscription;
  private readonly monthYearFormatter = new Intl.DateTimeFormat('es-PE', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = '';
  selectedStartDate = '';
  selectedEndDate = '';
  isPeriodSelectorOpen = false;
  isLoading = false;

  readonly currency: Currency = CURRENCIES.PEN;
  budgets: BudgetListItem[] = [];
  summary: BudgetSummary = {
    budgeted: 0,
    used: 0,
    percentage: 0
  };
  constructor(
    private readonly navService: NavigationService,
    private readonly filterState: FeatureFilterStateService,
    private readonly listBudgetsUseCase: ListBudgetsUseCase
  ) {
    this.setFilterSelection(this.getCurrentMonthSelection());
  }

  // MARK: - CICLO DE VIDA

  ngOnInit(): void {
    const savedSelection = this.filterState.get<FilterSelection>('budgets');

    if (savedSelection && this.isValidSelection(savedSelection)) {
      this.setFilterSelection(savedSelection);
    }

    this.filterResetSubscription = this.filterState.resetsFor('budgets').subscribe(() => {
      this.resetFiltersToCurrentMonth();
      this.loadBudgets();
    });

    this.loadBudgets();
  }

  ngOnDestroy(): void {
    this.budgetRequest?.unsubscribe();
    this.filterResetSubscription?.unsubscribe();
  }

  // MARK: - SERVICIOS

  private loadBudgets(): void {
    const request = this.buildRequest();

    if (!request) {
      this.clearBudgetData();
      return;
    }

    this.budgetRequest?.unsubscribe();
    this.isLoading = true;

    this.budgetRequest = this.listBudgetsUseCase
      .execute(request)
      .service({
        success: data => {
          this.isLoading = false;

          if (data) {
            this.setBudgetResponse(data);
            return;
          }

          this.clearBudgetData();
        },
        failure: () => {
          this.isLoading = false;
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

  get selectedDateRange(): string {
    return `${this.formatNumericDate(this.selectedStartDate)} - ${this.formatNumericDate(this.selectedEndDate)}`;
  }

  get selectedDateLabel(): string {
    if (this.selectedPeriod === 'monthly' && /^\d{4}-\d{2}$/.test(this.selectedPeriodValue)) {
      const [year, month] = this.selectedPeriodValue.split('-').map(Number);
      const label = this.monthYearFormatter.format(new Date(Date.UTC(year, month - 1, 1)));

      return label.charAt(0).toUpperCase() + label.slice(1);
    }

    if (this.selectedPeriod === 'annual' && /^\d{4}$/.test(this.selectedPeriodValue)) {
      return this.selectedPeriodValue;
    }

    return this.selectedDateRange;
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

    this.setFilterSelection(selection);
    this.filterState.set('budgets', selection);
    this.closePeriodSelector();
    this.loadBudgets();
  }

  openBudget(budget: BudgetListItem): void {
    this.navService.forward(`/budgets/detail/${budget.id}`, {
      budget,
      currency: this.currency.code,
      dateRangeLabel: this.selectedDateLabel
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

  private setFilterSelection(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
  }

  private resetFiltersToCurrentMonth(): void {
    this.setFilterSelection(this.getCurrentMonthSelection());
    this.closePeriodSelector();
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
  }

  private clearBudgetData(): void {
    this.budgets = [];
    this.summary = {
      budgeted: 0,
      used: 0,
      percentage: 0
    };
  }

  private getCurrentMonthSelection(): FilterSelection {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    return {
      period: 'monthly',
      periodValue: this.formatDateInput(today).slice(0, 7),
      startDate: this.formatDateInput(new Date(year, month, 1)),
      endDate: this.formatDateInput(new Date(year, month + 1, 0))
    };
  }

  private formatDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatNumericDate(value: string): string {
    const [year, month, day] = value.split('-');
    return year && month && day ? `${day}/${month}/${year}` : value;
  }
}
