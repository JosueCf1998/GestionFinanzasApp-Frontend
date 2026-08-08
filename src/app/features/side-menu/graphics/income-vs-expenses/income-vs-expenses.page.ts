import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { DashboardPeriodApi } from 'src/app/core/models/dashboard/dashboard.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { IncomeVsExpensesUseCase } from 'src/app/core/use-cases/dashboard/income-vs-expenses.usecase';
import 'src/app/core/utils/observable-extensions';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { FilterModalComponent, FilterSelection } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';
import {
  IncomeExpenseChartComponent,
  IncomeExpenseChartItem
} from 'src/app/shared/components/income-expense-chart/income-expense-chart.component';

interface IncomeExpenseNavigationState {
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
}

interface PeriodComparison extends IncomeExpenseChartItem {
  month: number;
  label: string;
  income: number;
  expenses: number;
  balance: number;
}

@Component({
  selector: 'app-income-vs-expenses',
  templateUrl: './income-vs-expenses.page.html',
  styleUrls: ['./income-vs-expenses.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    AccountSelectorModalComponent,
    EmptyStateComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    IncomeExpenseChartComponent,
    PageLayoutComponent,
    SectionCardComponent
  ]
})
export class IncomeVsExpensesPage implements OnInit, OnDestroy {
  private dataRequest?: Subscription;
  private accountRequest?: Subscription;
  private readonly initialAccountIds: number[];
  private annualData: PeriodComparison[] = [];

  readonly currency: Currency = CURRENCIES.PEN;
  readonly AccountSelectionMode = AccountSelectionMode;

  selectedPeriod: PeriodPreset = 'annual';
  selectedPeriodValue = String(new Date().getFullYear());
  selectedStartDate = `${new Date().getFullYear()}-01-01`;
  selectedEndDate = `${new Date().getFullYear()}-12-31`;
  periods: PeriodComparison[] = [];
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly incomeVsExpensesUseCase: IncomeVsExpensesUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as IncomeExpenseNavigationState;
    this.initialAccountIds = Array.isArray(state.selectedAccountIds)
      ? [...state.selectedAccountIds]
      : [];

    if (this.isIsoDate(state.startDate) && this.isIsoDate(state.endDate)) {
      this.selectedStartDate = state.startDate;
      this.selectedEndDate = state.endDate;
      this.selectedPeriod = this.isPeriodPreset(state.selectedPeriod) ? state.selectedPeriod : 'custom';
      this.selectedPeriodValue = state.selectedPeriodValue || state.startDate.slice(0, 7);
    }
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadComparison();
  }

  ngOnDestroy(): void {
    this.dataRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
    this.loadingService.hide();
  }

  get totalIncome(): number {
    return this.periods.reduce((sum, period) => sum + period.income, 0);
  }

  get totalExpenses(): number {
    return this.periods.reduce((sum, period) => sum + period.expenses, 0);
  }

  get totalBalance(): number {
    return this.totalIncome - this.totalExpenses;
  }

  get periodLabel(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedPeriodLabel(): string {
    return { weekly: 'Semanal', monthly: 'Mensual', annual: 'Anual', custom: 'Periodo' }[this.selectedPeriod];
  }

  get accountCaption(): string {
    if (!this.accounts.length) return 'Sin cuentas';
    if (this.selectedAccounts.length === this.accounts.length) return 'Todas las cuentas';
    if (this.selectedAccounts.length === 1) return this.selectedAccounts[0].name;
    return `${this.selectedAccounts.length} cuentas`;
  }

  back(): void {
    void this.navigationService.back();
  }

  openPeriodSelector(): void { this.isPeriodSelectorOpen = true; }
  closePeriodSelector(): void { this.isPeriodSelectorOpen = false; }
  openAccountSelector(): void { this.isAccountSelectorOpen = true; }
  closeAccountSelector(): void { this.isAccountSelectorOpen = false; }

  applyFilters(selection: FilterSelection): void {
    if (!this.isIsoDate(selection.startDate) || !this.isIsoDate(selection.endDate)) return;
    const yearChanged = selection.startDate.slice(0, 4) !== this.selectedStartDate.slice(0, 4);
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    yearChanged ? this.loadComparison() : this.applyDateRange();
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.closeAccountSelector();
    this.loadComparison();
  }

  private loadComparison(): void {
    const year = Number(this.selectedStartDate.slice(0, 4));
    if (!Number.isInteger(year)) return;
    this.dataRequest?.unsubscribe();
    this.loadingService.show();
    this.dataRequest = this.incomeVsExpensesUseCase.execute({ year }).service({
      success: data => {
        this.loadingService.hide();
        this.annualData = (data?.items ?? []).map((item, index) => this.mapPeriod(item, index));
        this.applyDateRange();
      },
      failure: () => {
        this.loadingService.hide();
        this.annualData = [];
        this.periods = [];
      }
    });
  }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        const selectedIds = new Set(this.initialAccountIds);
        this.selectedAccounts = selectedIds.size
          ? this.accounts.filter(account => selectedIds.has(account.id))
          : [...this.accounts];
      },
      failure: () => { this.accounts = []; this.selectedAccounts = []; }
    });
  }

  private applyDateRange(): void {
    const start = this.parseDate(this.selectedStartDate);
    const end = this.parseDate(this.selectedEndDate);
    if (!start || !end) { this.periods = []; return; }
    this.periods = this.annualData.filter(item => item.month >= start.getUTCMonth() + 1 && item.month <= end.getUTCMonth() + 1);
  }

  private mapPeriod(item: DashboardPeriodApi, index: number): PeriodComparison {
    const month = this.numberValue(item, 'month', 'mes') || this.monthFromPeriod(item.period) || index + 1;
    const income = this.numberValue(item, 'income', 'ingresos', 'total_income');
    const expenses = this.numberValue(item, 'expenses', 'gastos', 'total_expenses');
    const reportedBalance = this.numberValue(item, 'balance', 'saldo');
    return {
      month,
      label: this.monthLabel(month),
      income,
      expenses,
      balance: reportedBalance || income - expenses
    };
  }

  private numberValue(source: DashboardPeriodApi, ...keys: string[]): number {
    for (const key of keys) {
      const value = Number(source[key]);
      if (Number.isFinite(value)) return value;
    }
    return 0;
  }

  private monthFromPeriod(period?: string): number {
    if (!period) return 0;
    const numericMonth = period.match(/(?:^|[-/])(0?[1-9]|1[0-2])(?:$|[-/])/);
    if (numericMonth) return Number(numericMonth[1]);
    const normalized = period.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
      .findIndex(month => normalized.includes(month)) + 1;
  }

  private monthLabel(month: number): string {
    return new Intl.DateTimeFormat('es-PE', { month: 'short', timeZone: 'UTC' })
      .format(new Date(Date.UTC(2026, Math.max(0, month - 1), 1))).replace('.', '');
  }

  private isIsoDate(value: unknown): value is string {
    return typeof value === 'string' && this.parseDate(value) !== null;
  }

  private isPeriodPreset(value: unknown): value is PeriodPreset {
    return value === 'weekly' || value === 'monthly' || value === 'annual' || value === 'custom';
  }

  private parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${value}T00:00:00Z`)).replace(/\./g, '');
  }
}
