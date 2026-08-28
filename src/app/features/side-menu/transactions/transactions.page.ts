import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { Subscription } from 'rxjs';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { FeatureFilterStateService } from 'src/app/core/services/feature-filter-state.service';
import {
  Accounts,
  ListAccountsUseCase
} from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { FilterTransactionsUseCase } from 'src/app/core/use-cases/transactions/filter-transactions.usecase';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { AmountListItemComponent } from 'src/app/shared/components/amount-list-item/amount-list-item.component';
import { DonutChartSegment } from 'src/app/shared/components/donut-chart/donut-chart.component';
import { PeriodSummaryCardComponent } from 'src/app/shared/components/period-summary-card/period-summary-card.component';
import { ListSkeletonComponent } from 'src/app/shared/components/list-skeleton/list-skeleton.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import 'src/app/core/utils/observable-extensions';
import { normalizeFilteredTransaction } from 'src/app/core/utils/transaction.util';

type TransactionType = 'gasto' | 'ingreso';
type TransactionsFilterState = FilterSelection & {
  selectedType: TransactionType;
  selectedAccountIds: number[];
};

interface TransactionCategorySummary {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrl: './transactions.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    AccountSelectorModalComponent,
    CustomSegmentComponent,
    FeatureHeaderComponent,
    FloatingActionButtonComponent,
    ItemIconComponent,
    SectionCardComponent,
    AmountListItemComponent,
    ListSkeletonComponent,
    FilterTriggerComponent,
    PeriodSummaryCardComponent,
    FilterModalComponent
  ]
})
export class TransactionsPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) private content?: IonContent;

  private transactionRequest?: Subscription;
  private accountRequest?: Subscription;
  private filterResetSubscription?: Subscription;
  readonly AccountSelectionMode = AccountSelectionMode;
  readonly transactionTypes = [
    { value: 'gasto', label: 'Gastos' },
    { value: 'ingreso', label: 'Ingresos' }
  ];
  readonly currencySymbol = 'S/';

  selectedType: TransactionType = 'gasto';
  selectedPeriod: PeriodPreset = 'monthly';
  selectedPeriodValue = this.getCurrentMonth();
  selectedStartDate = this.getFirstDayOfCurrentMonth();
  selectedEndDate = this.getLastDayOfCurrentMonth();
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  private expenseTransactions: FilteredTransaction[] = [];
  private incomeTransactions: FilteredTransaction[] = [];
  transactions: FilteredTransaction[] = [];
  categorySummaries: TransactionCategorySummary[] = [];
  totalAmount = 0;
  isLoading = false;
  hasError = false;
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly filterTransactionsUseCase: FilterTransactionsUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly navService: NavigationService,
    private readonly filterState: FeatureFilterStateService
  ) {}

  ngOnInit(): void {
    const savedState = this.filterState.get<TransactionsFilterState>('transactions');
    if (savedState) this.setFilterState(savedState);

    this.filterResetSubscription = this.filterState.resetsFor('transactions').subscribe(() => {
      this.resetFilters();
      this.loadTransactions();
    });

    this.isLoading = true;
    this.loadAccounts(savedState?.selectedAccountIds);
  }

  ngOnDestroy(): void {
    this.transactionRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
    this.filterResetSubscription?.unsubscribe();
  }

  ionViewWillEnter(): void {
    void this.content?.scrollToTop(0);
  }

  get totalLabel(): string {
    return this.selectedType === 'gasto' ? 'Total de gastos' : 'Total de ingresos';
  }

  get accountCount(): number {
    return new Set(this.transactions.map(transaction => transaction.account.id)).size;
  }

  get accountLabel(): string {
    return this.accountCount === 1 ? 'cuenta vinculada' : 'cuentas vinculadas';
  }

  get chartSegments(): DonutChartSegment[] {
    const categories = new Map<number, DonutChartSegment>();

    this.transactions.forEach(transaction => {
      const amount = Number(transaction.amount);
      if (amount <= 0) return;

      const current = categories.get(transaction.category.id);
      categories.set(transaction.category.id, {
        value: (current?.value ?? 0) + amount,
        color: transaction.category.color
      });
    });

    return Array.from(categories.values());
  }

  get chartAriaLabel(): string {
    return `Distribución de ${this.selectedType === 'gasto' ? 'gastos' : 'ingresos'} por categoría`;
  }

  get periodLabel(): string {
    return `${this.formatShortDate(this.selectedStartDate)} – ${this.formatShortDate(this.selectedEndDate)}`;
  }

  get selectedPeriodLabel(): string {
    return {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Periodo'
    }[this.selectedPeriod];
  }

  get compactDateRange(): string {
    return `${this.formatCompactDate(this.selectedStartDate)} – ${this.formatCompactDate(this.selectedEndDate)}`;
  }

  get selectedAccountLabel(): string {
    if (!this.accounts.length) return 'Sin cuentas';
    if (this.selectedAccounts.length === this.accounts.length) {
      return 'Todas las cuentas';
    }
    if (this.selectedAccounts.length === 1) {
      return this.selectedAccounts[0].name;
    }
    return `${this.selectedAccounts.length} cuentas`;
  }

  changeType(value: string): void {
    if (value !== 'gasto' && value !== 'ingreso') return;

    this.selectedType = value;
    this.persistFilters();
    this.applyLocalFilters();
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
    this.loadTransactions();
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
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.hasError = false;

    this.transactionRequest?.unsubscribe();
    this.transactionRequest = this.filterTransactionsUseCase.execute({
      account_ids: this.selectedAccounts.map(account => account.id),
      start_date: this.selectedStartDate,
      end_date: this.selectedEndDate
    }).service({
      success: data => {
        const transactionList = data?.transactionList;
        this.expenseTransactions = (transactionList?.expensesList ?? [])
          .map(normalizeFilteredTransaction);
        this.incomeTransactions = (transactionList?.incomeList ?? [])
          .map(normalizeFilteredTransaction);
        this.applyLocalFilters();
        this.isLoading = false;
      },
      failure: () => {
        this.expenseTransactions = [];
        this.incomeTransactions = [];
        this.transactions = [];
        this.categorySummaries = [];
        this.totalAmount = 0;
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  createTransaction(): void {
    void this.navService.forward('/transactions/create');
  }

  openCategoryDetail(category: TransactionCategorySummary): void {
    void this.navService.forward(`/transactions/category/${category.id}`, {
      category,
      transactionType: this.selectedType,
      selectedPeriod: this.selectedPeriod,
      selectedPeriodValue: this.selectedPeriodValue,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      selectedAccountIds: this.selectedAccounts.map(account => account.id),
      currencySymbol: this.currencySymbol
    });
  }

  trackByCategory(_: number, category: TransactionCategorySummary): number {
    return category.id;
  }

  private loadAccounts(selectedAccountIds?: number[]): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        this.selectedAccounts = selectedAccountIds
          ? this.accounts.filter(account => selectedAccountIds.includes(account.id))
          : [...this.accounts];
        this.loadTransactions();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
        this.loadTransactions();
      }
    });
  }

  private setPeriodSelection(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
  }

  private setFilterState(state: TransactionsFilterState): void {
    this.setPeriodSelection(state);
    this.selectedType = state.selectedType;
  }

  private persistFilters(): void {
    this.filterState.set<TransactionsFilterState>('transactions', {
      period: this.selectedPeriod,
      periodValue: this.selectedPeriodValue,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      selectedType: this.selectedType,
      selectedAccountIds: this.selectedAccounts.map(account => account.id)
    });
  }

  private resetFilters(): void {
    this.selectedType = 'gasto';
    this.selectedPeriod = 'monthly';
    this.selectedPeriodValue = this.getCurrentMonth();
    this.selectedStartDate = this.getFirstDayOfCurrentMonth();
    this.selectedEndDate = this.getLastDayOfCurrentMonth();
    this.selectedAccounts = [...this.accounts];
    this.closePeriodSelector();
    this.closeAccountSelector();
  }

  private applyLocalFilters(): void {
    const selectedAccountIds = new Set(
      this.selectedAccounts.map(account => account.id)
    );
    const filterByAccount = this.accounts.length > 0 &&
      this.selectedAccounts.length < this.accounts.length;

    const selectedTransactions = this.selectedType === 'gasto'
      ? this.expenseTransactions
      : this.incomeTransactions;

    this.transactions = selectedTransactions
      .filter(transaction => {
        const date = transaction.date.slice(0, 10);
        const matchesDate = date >= this.selectedStartDate &&
          date <= this.selectedEndDate;
        const matchesAccount = !filterByAccount ||
          selectedAccountIds.has(transaction.account.id);
        return matchesDate && matchesAccount;
      })
      .sort(
        (first, second) =>
          second.date.localeCompare(first.date) || second.id - first.id
      );

    this.totalAmount = this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    this.categorySummaries = this.buildCategorySummaries(this.transactions);

    requestAnimationFrame(() => {
      void this.content?.scrollToTop(0);
    });
  }

  private buildCategorySummaries(
    transactions: FilteredTransaction[]
  ): TransactionCategorySummary[] {
    const summaries = new Map<number, TransactionCategorySummary>();

    transactions.forEach(transaction => {
      const current = summaries.get(transaction.category.id);
      summaries.set(transaction.category.id, {
        id: transaction.category.id,
        name: transaction.category.name,
        icon: transaction.category.icon,
        color: transaction.category.color,
        amount: (current?.amount ?? 0) + transaction.amount
      });
    });

    return Array.from(summaries.values())
      .sort((first, second) => second.amount - first.amount);
  }

  private formatShortDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    })
      .format(new Date(`${value}T00:00:00Z`))
      .replace(/\./g, '');
  }

  private formatCompactDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
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

  private formatDateInput(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
