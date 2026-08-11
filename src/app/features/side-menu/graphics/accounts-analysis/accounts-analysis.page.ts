import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { forkJoin, Subscription } from 'rxjs';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { DashboardSummary } from 'src/app/core/models/dashboard/dashboard.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { DashboardSummaryUseCase } from 'src/app/core/use-cases/dashboard/dashboard-summary.usecase';
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

interface AccountsAnalysisNavigationState {
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
}

interface AccountAnalysisRow {
  id: number;
  name: string;
  income: number;
  expenses: number;
  balance: number;
}

@Component({
  selector: 'app-accounts-analysis',
  templateUrl: './accounts-analysis.page.html',
  styleUrls: ['./accounts-analysis.page.scss'],
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
export class AccountsAnalysisPage implements OnInit, OnDestroy {
  private accountRequest?: Subscription;
  private analysisRequest?: Subscription;
  private readonly initialAccountIds: number[];

  readonly currency: Currency = CURRENCIES.PEN;
  readonly AccountSelectionMode = AccountSelectionMode;

  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  rows: AccountAnalysisRow[] = [];
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly dashboardSummaryUseCase: DashboardSummaryUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as AccountsAnalysisNavigationState;
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

  ngOnInit(): void { this.loadAccounts(); }

  ngOnDestroy(): void {
    this.accountRequest?.unsubscribe();
    this.analysisRequest?.unsubscribe();
    this.loadingService.hide();
  }

  get totalIncome(): number { return this.rows.reduce((sum, row) => sum + row.income, 0); }
  get totalExpenses(): number { return this.rows.reduce((sum, row) => sum + row.expenses, 0); }
  get totalBalance(): number { return this.rows.reduce((sum, row) => sum + row.balance, 0); }

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
    this.loadAnalysis();
  }

  applyAccountFilter(accounts: Accounts[]): void {
    this.selectedAccounts = [...accounts];
    this.closeAccountSelector();
    this.loadAnalysis();
  }

  trackByAccount(_: number, row: AccountAnalysisRow): number { return row.id; }

  absolute(value: number): number { return Math.abs(value); }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().subscribe(result => {
      this.accounts = result.success ? result.data?.items ?? [] : [];
      const ids = new Set(this.initialAccountIds);
      this.selectedAccounts = ids.size
        ? this.accounts.filter(account => ids.has(account.id))
        : [...this.accounts];
      this.loadAnalysis();
    });
  }

  private loadAnalysis(): void {
    this.analysisRequest?.unsubscribe();
    if (!this.selectedAccounts.length) {
      this.rows = [];
      this.loadingService.hide();
      return;
    }

    this.loadingService.show();
    const requests = this.selectedAccounts.map(account =>
      this.dashboardSummaryUseCase.execute({
        fecha_inicio: this.selectedStartDate,
        fecha_fin: this.selectedEndDate,
        cuentas: [account.id]
      })
    );

    this.analysisRequest = forkJoin(requests).subscribe({
      next: results => {
        this.rows = results.map((result, index) =>
          this.mapRow(this.selectedAccounts[index], result.success ? result.data?.summary : undefined)
        );
        this.loadingService.hide();
      },
      error: () => {
        this.rows = [];
        this.loadingService.hide();
      }
    });
  }

  private mapRow(account: Accounts, summary?: DashboardSummary): AccountAnalysisRow {
    return {
      id: account.id,
      name: account.name,
      income: summary?.totalIncome ?? 0,
      expenses: summary?.totalExpenses ?? 0,
      balance: summary?.periodBalance ?? 0
    };
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
