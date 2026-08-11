import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { DashboardCategory, DashboardRequest } from 'src/app/core/models/dashboard/dashboard.model';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { ExpensesByCategoryUseCase } from 'src/app/core/use-cases/dashboard/expenses-by-category.usecase';
import {
  Accounts,
  ListAccountsUseCase
} from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import 'src/app/core/utils/observable-extensions';
import { DonutChartComponent, DonutChartSegment } from 'src/app/shared/components/donut-chart/donut-chart.component';
import { FilterModalComponent, FilterSelection } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import {
  CategoryResponse,
  ListCategoriesUseCase
} from 'src/app/core/use-cases/categories/list-categories.usecase';

interface ExpensesByCategoryNavigationState {
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
}

@Component({
  selector: 'app-expenses-by-category',
  templateUrl: './expenses-by-category.page.html',
  styleUrls: ['./expenses-by-category.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    AccountSelectorModalComponent,
    DonutChartComponent,
    EmptyStateComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    ItemIconComponent,
    PageLayoutComponent,
    SectionCardComponent
  ]
})
export class ExpensesByCategoryPage implements OnInit, OnDestroy {
  private request?: Subscription;
  private accountRequest?: Subscription;
  private categoryRequest?: Subscription;
  private readonly initialAccountIds: number[];
  private dashboardCategories: DashboardCategory[] = [];
  private categoryCatalog: CategoryResponse[] = [];

  readonly currency: Currency = CURRENCIES.PEN;
  readonly AccountSelectionMode = AccountSelectionMode;

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  categories: DashboardCategory[] = [];
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly expensesByCategoryUseCase: ExpensesByCategoryUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as ExpensesByCategoryNavigationState;
    this.initialAccountIds = Array.isArray(state.selectedAccountIds)
      ? [...state.selectedAccountIds]
      : [];

    if (this.isIsoDate(state.startDate) && this.isIsoDate(state.endDate)) {
      this.selectedStartDate = state.startDate;
      this.selectedEndDate = state.endDate;
      this.selectedPeriod = this.isPeriodPreset(state.selectedPeriod)
        ? state.selectedPeriod
        : this.isFullMonth(state.startDate, state.endDate) ? 'monthly' : 'custom';
      this.selectedPeriodValue = state.selectedPeriodValue || state.startDate.slice(0, 7);
    }
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadCategoryCatalog();
  }

  ngOnDestroy(): void {
    this.request?.unsubscribe();
    this.accountRequest?.unsubscribe();
    this.categoryRequest?.unsubscribe();
    this.loadingService.hide();
  }

  get totalExpenses(): number {
    return this.categories.reduce((total, category) => total + category.amount, 0);
  }

  get chartSegments(): DonutChartSegment[] {
    return this.categories.map(category => ({
      value: category.amount,
      color: category.color
    }));
  }

  get periodLabel(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedPeriodLabel(): string {
    return {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Periodo'
    }[this.selectedPeriod];
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

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  openAccountSelector(): void {
    this.isAccountSelectorOpen = true;
  }

  closeAccountSelector(): void {
    this.isAccountSelectorOpen = false;
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.closeAccountSelector();
    this.loadExpenses();
  }

  applyFilters(selection: FilterSelection): void {
    if (!this.isIsoDate(selection.startDate) || !this.isIsoDate(selection.endDate)) return;

    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    this.loadExpenses();
  }

  trackByCategory(_: number, category: DashboardCategory): number {
    return category.id;
  }

  percentage(category: DashboardCategory): number {
    if (category.percentage > 0) return category.percentage;
    return this.totalExpenses > 0 ? (category.amount / this.totalExpenses) * 100 : 0;
  }

  private loadExpenses(): void {
    const request = this.buildRequest();
    if (!request) {
      this.categories = [];
      return;
    }

    this.request?.unsubscribe();
    this.loadingService.show();
    this.request = this.expensesByCategoryUseCase.execute(request).service({
      success: data => {
        this.loadingService.hide();
        this.dashboardCategories = [...(data?.items ?? [])]
          .filter(category => category.amount > 0)
          .sort((first, second) => second.amount - first.amount);
        this.applyCategoryAppearance();
      },
      failure: () => {
        this.loadingService.hide();
        this.dashboardCategories = [];
        this.categories = [];
      }
    });
  }

  private loadCategoryCatalog(): void {
    this.categoryRequest?.unsubscribe();
    this.categoryRequest = this.listCategoriesUseCase.execute().service({
      success: data => {
        this.categoryCatalog = data?.items ?? [];
        this.applyCategoryAppearance();
      },
      failure: () => {
        this.categoryCatalog = [];
        this.applyCategoryAppearance();
      }
    });
  }

  private applyCategoryAppearance(): void {
    this.categories = this.dashboardCategories.map(category => {
      const catalogCategory = this.findCatalogCategory(category);
      if (!catalogCategory) return category;

      return {
        ...category,
        icon: catalogCategory.icono || category.icon,
        color: catalogCategory.color || category.color
      };
    });
  }

  private findCatalogCategory(category: DashboardCategory): CategoryResponse | undefined {
    const normalizedName = this.normalizeCategoryName(category.name);
    return this.categoryCatalog.find(item =>
      (category.id > 0 && item.id === category.id) ||
      this.normalizeCategoryName(item.nombre) === normalizedName
    );
  }

  private normalizeCategoryName(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
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
        this.loadExpenses();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
        this.loadExpenses();
      }
    });
  }

  private buildRequest(): DashboardRequest | null {
    if (!this.parseDate(this.selectedStartDate) || !this.parseDate(this.selectedEndDate)) {
      return null;
    }
    return {
      fecha_inicio: this.selectedStartDate,
      fecha_fin: this.selectedEndDate,
      cuentas: this.selectedAccounts.map(account => account.id)
    };
  }

  private isFullMonth(startDate: string, endDate: string): boolean {
    const start = this.parseDate(startDate);
    const end = this.parseDate(endDate);
    if (!start || !end || start.getUTCDate() !== 1) return false;
    const expectedEnd = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0));
    return end.getTime() === expectedEnd.getTime();
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
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`)).replace(/\./g, '');
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
