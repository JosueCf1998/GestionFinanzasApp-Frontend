import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { DashboardCategory } from 'src/app/core/models/dashboard/dashboard.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { CategoryResponse, ListCategoriesUseCase } from 'src/app/core/use-cases/categories/list-categories.usecase';
import { TopExpenseCategoriesUseCase } from 'src/app/core/use-cases/dashboard/top-expense-categories.usecase';
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
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CURRENCIES, Currency } from 'src/app/shared/models/currency.model';

interface TopCategoriesNavigationState {
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
}

@Component({
  selector: 'app-top-expense-categories',
  templateUrl: './top-expense-categories.page.html',
  styleUrls: ['./top-expense-categories.page.scss'],
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
    SectionCardComponent
  ]
})
export class TopExpenseCategoriesPage implements OnInit, OnDestroy {
  private rankingRequest?: Subscription;
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
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  categories: DashboardCategory[] = [];
  readonly limit = 5;
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly topExpenseCategoriesUseCase: TopExpenseCategoriesUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as TopCategoriesNavigationState;
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
    this.loadCategoryCatalog();
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    this.rankingRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
    this.categoryRequest?.unsubscribe();
    this.loadingService.hide();
  }

  get totalAmount(): number {
    return this.categories.reduce((sum, category) => sum + category.amount, 0);
  }

  get totalPercentage(): number {
    return this.categories.reduce((sum, category) => sum + category.percentage, 0);
  }

  get maxAmount(): number {
    return Math.max(...this.categories.map(category => category.amount), 0);
  }

  get periodLabel(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedPeriodLabel(): string {
    return { weekly: 'Semanal', monthly: 'Mensual', annual: 'Anual', custom: 'Periodo' }[
      this.selectedPeriod
    ];
  }

  get accountLabel(): string {
    if (!this.accounts.length || this.selectedAccounts.length === this.accounts.length) {
      return 'Todas las cuentas';
    }
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
    this.loadRanking();
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.closeAccountSelector();
    this.loadRanking();
  }

  barWidth(category: DashboardCategory): number {
    return this.maxAmount > 0 ? Math.max((category.amount / this.maxAmount) * 100, 4) : 0;
  }

  percentage(category: DashboardCategory): number {
    return category.percentage > 0
      ? category.percentage
      : this.totalAmount > 0 ? (category.amount / this.totalAmount) * 100 : 0;
  }

  trackByCategory(_: number, category: DashboardCategory): number { return category.id; }

  private loadRanking(): void {
    this.rankingRequest?.unsubscribe();
    this.loadingService.show();
    this.rankingRequest = this.topExpenseCategoriesUseCase.execute({
      fecha_inicio: this.selectedStartDate,
      fecha_fin: this.selectedEndDate,
      cuentas: this.selectedAccounts.map(account => account.id),
      limit: this.limit
    }).service({
      success: data => {
        this.loadingService.hide();
        this.dashboardCategories = [...(data?.items ?? [])]
          .filter(category => category.amount > 0)
          .sort((first, second) => second.amount - first.amount)
          .slice(0, this.limit);
        this.applyCategoryAppearance();
      },
      failure: () => {
        this.loadingService.hide();
        this.dashboardCategories = [];
        this.categories = [];
      }
    });
  }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        const ids = new Set(this.initialAccountIds);
        this.selectedAccounts = ids.size
          ? this.accounts.filter(account => ids.has(account.id))
          : [...this.accounts];
        this.loadRanking();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
        this.loadRanking();
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
      const normalizedName = this.normalizeName(category.name);
      const catalogItem = this.categoryCatalog.find(item =>
        (category.id > 0 && item.id === category.id) ||
        this.normalizeName(item.nombre) === normalizedName
      );
      return catalogItem ? {
        ...category,
        icon: catalogItem.icono || category.icon,
        color: this.normalizeColor(catalogItem.color || category.color)
      } : { ...category, color: this.normalizeColor(category.color) };
    });
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

  private getFirstDayOfCurrentMonth(): string {
    const today = new Date();
    return this.formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1));
  }
  private getCurrentMonth(): string { return this.formatDateInput(new Date()).slice(0, 7); }
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
