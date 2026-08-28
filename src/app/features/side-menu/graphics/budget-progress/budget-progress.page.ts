import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {
  BudgetListItem,
  PeriodPreset
} from 'src/app/core/models/budgets/list-budgets.model';
import {
  DashboardBudgetApi,
  DashboardBudgetTotalsApi
} from 'src/app/core/models/dashboard/dashboard.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { ListBudgetsUseCase } from 'src/app/core/use-cases/budgets/list-budgets.usecase';
import { BudgetProgressUseCase } from 'src/app/core/use-cases/dashboard/budget-progress.usecase';
import 'src/app/core/utils/observable-extensions';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import {
  ProgressListItem,
  ProgressListItemComponent,
  ProgressItemStatus
} from 'src/app/shared/components/progress-list-item/progress-list-item.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';

interface BudgetProgressNavigationState {
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
}

@Component({
  selector: 'app-budget-progress',
  templateUrl: './budget-progress.page.html',
  styleUrls: ['./budget-progress.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    AccountSelectorModalComponent,
    EmptyStateComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    PageLayoutComponent,
    ProgressListItemComponent,
    SectionCardComponent
  ]
})
export class BudgetProgressPage implements OnInit, OnDestroy {
  private budgetRequest?: Subscription;
  private budgetCatalogRequest?: Subscription;
  private accountRequest?: Subscription;
  private readonly initialAccountIds: number[];
  private dashboardBudgets: DashboardBudgetApi[] = [];
  private budgetCatalog: BudgetListItem[] = [];

  readonly currency: Currency = CURRENCIES.PEN;
  readonly AccountSelectionMode = AccountSelectionMode;

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  budgets: ProgressListItem[] = [];
  totalBudget = 0;
  totalSpent = 0;
  totalRemaining = 0;
  usagePercentage = 0;
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly budgetProgressUseCase: BudgetProgressUseCase,
    private readonly listBudgetsUseCase: ListBudgetsUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as BudgetProgressNavigationState;
    this.initialAccountIds = Array.isArray(state.selectedAccountIds)
      ? [...state.selectedAccountIds]
      : [];

    if (this.isIsoDate(state.startDate) && this.isIsoDate(state.endDate)) {
      this.selectedStartDate = state.startDate;
      this.selectedEndDate = state.endDate;
      this.selectedPeriod = this.isPeriodPreset(state.selectedPeriod)
        ? state.selectedPeriod
        : 'custom';
      this.selectedPeriodValue = state.selectedPeriodValue || state.startDate.slice(0, 7);
    }
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    this.budgetRequest?.unsubscribe();
    this.budgetCatalogRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
    this.loadingService.hide();
  }

  get periodLabel(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedPeriodLabel(): string {
    return { weekly: 'Semanal', monthly: 'Mensual', annual: 'Anual', custom: 'Periodo' }[
      this.selectedPeriod
    ];
  }

  get accountCaption(): string {
    if (!this.accounts.length) return 'Sin cuentas';
    if (this.selectedAccounts.length === this.accounts.length) return 'Todas las cuentas';
    if (this.selectedAccounts.length === 1) return this.selectedAccounts[0].name;
    return `${this.selectedAccounts.length} cuentas`;
  }

  back(): void { void this.navigationService.back(); }
  openPeriodSelector(): void { this.isPeriodSelectorOpen = true; }
  closePeriodSelector(): void { this.isPeriodSelectorOpen = false; }
  openAccountSelector(): void { this.isAccountSelectorOpen = true; }
  closeAccountSelector(): void { this.isAccountSelectorOpen = false; }

  applyFilters(selection: FilterSelection): void {
    if (!this.isIsoDate(selection.startDate) || !this.isIsoDate(selection.endDate)) return;
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    this.loadBudgetCatalog();
    this.loadBudgets();
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.closeAccountSelector();
    this.loadBudgets();
  }

  trackByBudget(_: number, budget: ProgressListItem): number { return budget.id; }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        const selectedIds = new Set(this.initialAccountIds);
        this.selectedAccounts = selectedIds.size
          ? this.accounts.filter(account => selectedIds.has(account.id))
          : [...this.accounts];
        this.loadBudgetCatalog();
        this.loadBudgets();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
        this.loadBudgetCatalog();
        this.loadBudgets();
      }
    });
  }

  private loadBudgets(): void {
    this.budgetRequest?.unsubscribe();
    this.loadingService.show();
    this.budgetRequest = this.budgetProgressUseCase.execute({
      fecha_inicio: this.selectedStartDate,
      fecha_fin: this.selectedEndDate,
      cuentas: this.selectedAccounts.map(account => account.id)
    }).service({
      success: data => {
        this.loadingService.hide();
        this.dashboardBudgets = data?.items ?? [];
        this.mapBudgets();
        this.applyTotals(data?.totals, this.budgets);
      },
      failure: () => {
        this.loadingService.hide();
        this.clearData();
      }
    });
  }

  private loadBudgetCatalog(): void {
    this.budgetCatalogRequest?.unsubscribe();
    this.budgetCatalogRequest = this.listBudgetsUseCase.execute({
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    }).service({
      success: data => {
        this.budgetCatalog = data?.items ?? [];
        this.mapBudgets();
      },
      failure: () => {
        this.budgetCatalog = [];
        this.mapBudgets();
      }
    });
  }

  private mapBudgets(): void {
    this.budgets = this.dashboardBudgets.map((item, index) => this.mapBudget(item, index));
  }

  private mapBudget(item: DashboardBudgetApi, index: number): ProgressListItem {
    const budgeted = this.numberValue(item, 'budget_amount', 'monto_presupuesto', 'budgeted', 'amount');
    const used = this.numberValue(item, 'spent_amount', 'monto_gastado', 'spent', 'used');
    const percentage = this.numberValue(item, 'percentage', 'porcentaje') ||
      (budgeted > 0 ? (used / budgeted) * 100 : 0);

    const id = this.numberValue(item, 'budget_id', 'presupuesto_id', 'id') || index + 1;
    const name = this.stringValue(item, 'budget_name', 'nombre_presupuesto', 'category_name', 'categoria_nombre', 'name') || 'Presupuesto';
    const catalogItem = this.budgetCatalog.find(budget =>
      budget.id === id || this.normalizeName(budget.name) === this.normalizeName(name)
    );

    return {
      id,
      name,
      icon: this.stringValue(item, 'icon', 'icono', 'budget_icon', 'icono_presupuesto') || catalogItem?.icon || 'budget-wallet',
      color: this.normalizeColor(
        this.stringValue(item, 'color', 'category_color', 'color_categoria', 'budget_color', 'color_presupuesto') ||
        catalogItem?.color || this.statusColor(percentage)
      ),
      budgeted,
      used,
      percentage: Math.round(Math.max(0, percentage) * 10) / 10,
      status: this.statusFor(percentage)
    };
  }

  private applyTotals(totals: DashboardBudgetTotalsApi | undefined, budgets: ProgressListItem[]): void {
    const calculatedBudget = budgets.reduce((sum, item) => sum + item.budgeted, 0);
    const calculatedSpent = budgets.reduce((sum, item) => sum + item.used, 0);
    this.totalBudget = this.numberValue(totals ?? {}, 'total_budget', 'presupuesto_total', 'budgeted') || calculatedBudget;
    this.totalSpent = this.numberValue(totals ?? {}, 'spent_amount', 'total_spent', 'gastado', 'used') || calculatedSpent;
    this.totalRemaining = this.numberValue(totals ?? {}, 'remaining_amount', 'remaining_budget', 'restante') ||
      this.totalBudget - this.totalSpent;
    this.usagePercentage = this.numberValue(totals ?? {}, 'percentage', 'usage_percentage', 'porcentaje') ||
      (this.totalBudget > 0 ? (this.totalSpent / this.totalBudget) * 100 : 0);
  }

  private clearData(): void {
    this.budgets = [];
    this.dashboardBudgets = [];
    this.totalBudget = 0;
    this.totalSpent = 0;
    this.totalRemaining = 0;
    this.usagePercentage = 0;
  }

  private statusFor(percentage: number): ProgressItemStatus {
    if (percentage > 100) return 'EXCEEDED';
    if (percentage >= 90) return 'WARNING';
    return 'ON_TRACK';
  }

  private statusColor(percentage: number): string {
    if (percentage > 100) return 'var(--fv-danger)';
    if (percentage >= 90) return 'var(--fv-warning)';
    return 'var(--fv-success)';
  }

  private numberValue(source: DashboardBudgetApi | DashboardBudgetTotalsApi, ...keys: string[]): number {
    for (const key of keys) {
      const value = Number(source[key]);
      if (Number.isFinite(value)) return value;
    }
    return 0;
  }

  private stringValue(source: DashboardBudgetApi, ...keys: string[]): string {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return '';
  }

  private normalizeColor(value: string): string {
    if (/^[\da-f]{6}$/i.test(value)) return `#${value}`;
    return value || 'var(--fv-primary)';
  }

  private normalizeName(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }

  private isIsoDate(value: unknown): value is string {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    return !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
  }

  private isPeriodPreset(value: unknown): value is PeriodPreset {
    return value === 'weekly' || value === 'monthly' || value === 'annual' || value === 'custom';
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`)).replace(/\./g, '');
  }

  private getCurrentMonth(): string { return this.formatDateInput(new Date()).slice(0, 7); }
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
