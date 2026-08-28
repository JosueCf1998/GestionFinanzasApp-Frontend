import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import 'src/app/core/utils/observable-extensions';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { FeatureFilterStateService } from 'src/app/core/services/feature-filter-state.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import {
  DashboardRequest,
  DashboardSummary
} from 'src/app/core/models/dashboard/dashboard.model';
import {
  Accounts,
  ListAccountsUseCase
} from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { DashboardSummaryUseCase } from 'src/app/core/use-cases/dashboard/dashboard-summary.usecase';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';

interface FinancialMetric {
  label: string;
  amount: number;
  tone: 'income' | 'expense' | 'period' | 'balance';
  icon?: string;
  iconColor?: string;
}

interface PeriodGraphicCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  label: string;
}

type GraphicsFilterState = FilterSelection & {
  selectedAccountIds: number[];
};

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    AccountSelectorModalComponent,
    FeatureHeaderComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    ItemIconComponent,
    SectionCardComponent
  ]
})
export class GraphicsPage implements OnInit, OnDestroy {
  private accountRequest?: Subscription;
  private dashboardRequest?: Subscription;
  private filterResetSubscription?: Subscription;

  readonly AccountSelectionMode = AccountSelectionMode;
  readonly currency: Currency = CURRENCIES.PEN;

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  metrics: FinancialMetric[] = [
    { label: 'Ingresos', amount: 0, tone: 'income', icon: 'up-trend', iconColor: 'var(--fv-success)' },
    { label: 'Gastos', amount: 0, tone: 'expense', icon: 'down-trend', iconColor: 'var(--fv-danger)' },
    { label: 'Saldo del periodo', amount: 0, tone: 'period' },
    { label: 'Saldo actual', amount: 0, tone: 'balance' }
  ];

  readonly periodGraphicCards: PeriodGraphicCard[] = [
    {
      title: 'Gastos por categoría',
      description: 'Revisa en qué categorías gastas más.',
      icon: 'category',
      route: '/graphics/expenses-by-category',
      label: 'Gastos'
    },
    {
      title: 'Ingresos vs Gastos',
      description: 'Compara tus movimientos del periodo.',
      icon: 'transfer',
      route: '/graphics/income-vs-expenses',
      label: 'Comparativa'
    },
    {
      title: 'Evolución del saldo',
      description: 'Consulta el estado actual de tus saldos.',
      icon: 'up-trend',
      route: '/graphics/balance-evolution',
      label: 'Tendencia'
    },
    {
      title: 'Progreso de presupuestos',
      description: 'Controla el avance de tus presupuestos.',
      icon: 'budget-wallet',
      route: '/graphics/budget-progress',
      label: 'Presupuestos'
    },
    {
      title: 'Top categorías de gastos',
      description: 'Identifica tus principales categorías.',
      icon: 'bills',
      route: '/graphics/top-expense-categories',
      label: 'Ranking'
    },
    {
      title: 'Análisis por cuentas',
      description: 'Consulta el balance de cada cuenta.',
      icon: 'account',
      route: '/graphics/accounts-analysis',
      label: 'Cuentas'
    }
  ];

  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly dashboardSummaryUseCase: DashboardSummaryUseCase,
    private readonly navigationService: NavigationService,
    private readonly filterState: FeatureFilterStateService,
    public readonly loadingService: SpinnerService
  ) {}

  ngOnInit(): void {
    const savedState = this.filterState.get<GraphicsFilterState>('graphics');
    if (savedState) this.setPeriodSelection(savedState);

    this.filterResetSubscription = this.filterState.resetsFor('graphics').subscribe(() => {
      this.resetFilters();
      this.loadDashboard();
    });

    this.loadAccounts(savedState?.selectedAccountIds);
  }

  ngOnDestroy(): void {
    this.accountRequest?.unsubscribe();
    this.dashboardRequest?.unsubscribe();
    this.filterResetSubscription?.unsubscribe();
    this.loadingService.hide();
  }

  get selectedPeriodLabel(): string {
    return {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Rango de fechas'
    }[this.selectedPeriod];
  }

  get compactDateRange(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedAccountLabel(): string {
    if (!this.accounts.length) return 'Sin cuentas';
    if (this.selectedAccounts.length === this.accounts.length) return 'Todas las cuentas';
    if (this.selectedAccounts.length === 1) return this.selectedAccounts[0].name;
    return `${this.selectedAccounts.length} cuentas`;
  }

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  applyFilters(selection: FilterSelection): void {
    this.setPeriodSelection(selection);
    this.persistFilters();
    this.closePeriodSelector();
    this.loadDashboard();
  }

  openAccountSelector(): void {
    this.isAccountSelectorOpen = true;
  }

  closeAccountSelector(): void {
    this.isAccountSelectorOpen = false;
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.persistFilters();
    this.closeAccountSelector();
    this.loadDashboard();
  }

  openPeriodGraphic(card: PeriodGraphicCard): void {
    void this.navigationService.forward(card.route, {
      selectedPeriod: this.selectedPeriod,
      selectedPeriodValue: this.selectedPeriodValue,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      selectedAccountIds: this.selectedAccounts.map(account => account.id)
    });
  }

  private loadAccounts(selectedAccountIds?: number[]): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        this.selectedAccounts = selectedAccountIds
          ? this.accounts.filter(account => selectedAccountIds.includes(account.id))
          : [...this.accounts];
        this.loadDashboard();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
        this.loadDashboard();
      }
    });
  }

  private setPeriodSelection(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
  }

  private persistFilters(): void {
    this.filterState.set<GraphicsFilterState>('graphics', {
      period: this.selectedPeriod,
      periodValue: this.selectedPeriodValue,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      selectedAccountIds: this.selectedAccounts.map(account => account.id)
    });
  }

  private resetFilters(): void {
    this.selectedPeriod = 'monthly';
    this.selectedPeriodValue = this.getCurrentMonth();
    this.selectedStartDate = this.getFirstDayOfCurrentMonth();
    this.selectedEndDate = this.getLastDayOfCurrentMonth();
    this.selectedAccounts = [...this.accounts];
    this.closePeriodSelector();
    this.closeAccountSelector();
  }

  private loadDashboard(): void {
    const request = this.buildDashboardRequest();
    if (!request) {
      this.clearDashboardData();
      return;
    }

    this.dashboardRequest?.unsubscribe();
    this.loadingService.show();
    this.dashboardRequest = this.dashboardSummaryUseCase.execute(request).service({
      success: data => {
        this.loadingService.hide();
        data ? this.applyDashboardSummary(data.summary) : this.clearDashboardData();
      },
      failure: () => {
        this.loadingService.hide();
        this.clearDashboardData();
      }
    });
  }

  private buildDashboardRequest(): DashboardRequest | null {
    if (!this.parseDate(this.selectedStartDate) || !this.parseDate(this.selectedEndDate)) {
      return null;
    }

    return {
      fecha_inicio: this.selectedStartDate,
      fecha_fin: this.selectedEndDate,
      cuentas: this.selectedAccounts.map(account => account.id)
    };
  }

  private applyDashboardSummary(summary: DashboardSummary): void {
    this.metrics = [
      { label: 'Ingresos', amount: summary.totalIncome, tone: 'income', icon: 'up-trend', iconColor: 'var(--fv-success)' },
      { label: 'Gastos', amount: summary.totalExpenses, tone: 'expense', icon: 'down-trend', iconColor: 'var(--fv-danger)' },
      { label: 'Saldo del periodo', amount: summary.periodBalance, tone: 'period' },
      { label: 'Saldo actual', amount: summary.currentBalance, tone: 'balance' }
    ];
  }

  private clearDashboardData(): void {
    this.applyDashboardSummary({
      totalIncome: 0,
      totalExpenses: 0,
      periodBalance: 0,
      currentBalance: 0,
      totalBudget: 0,
      spentBudget: 0,
      remainingBudget: 0,
      savingsPercentage: 0
    });
  }

  private parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    })
      .format(new Date(`${value}T00:00:00Z`))
      .replace(/\./g, '');
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
