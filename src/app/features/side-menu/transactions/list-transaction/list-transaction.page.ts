import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { FilterTransactionsUseCase } from 'src/app/core/use-cases/transactions/filter-transactions.usecase';
import { normalizeFilteredTransaction } from 'src/app/core/utils/transaction.util';
import { AccountSelectionMode, AccountSelectorModalComponent } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import {
  CompactListItem,
  CompactListItemComponent
} from 'src/app/shared/components/compact-list-item/compact-list-item.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { FilterModalComponent, FilterSelection } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ListSkeletonComponent } from 'src/app/shared/components/list-skeleton/list-skeleton.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import 'src/app/core/utils/observable-extensions';

type TransactionType = 'gasto' | 'ingreso';

interface TransactionCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface TransactionCategoryDetailState {
  category?: TransactionCategory;
  transactionType?: TransactionType;
  selectedPeriod?: PeriodPreset;
  selectedPeriodValue?: string;
  startDate?: string;
  endDate?: string;
  selectedAccountIds?: number[];
  currencySymbol?: string;
}

interface TransactionDateGroup {
  date: string;
  label: string;
  items: TransactionListEntry[];
}

interface TransactionListEntry {
  id: number;
  view: CompactListItem;
  transaction: FilteredTransaction;
}

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.page.html',
  styleUrl: './list-transaction.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    AccountSelectorModalComponent,
    CompactListItemComponent,
    EmptyStateComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    FloatingActionButtonComponent,
    ListSkeletonComponent,
    PageLayoutComponent,
    SectionCardComponent
  ]
})
export class ListTransactionPage implements OnInit, OnDestroy {
  private transactionRequest?: Subscription;
  private accountRequest?: Subscription;
  private allTransactions: FilteredTransaction[] = [];
  private readonly initialAccountIds: Set<number>;

  readonly AccountSelectionMode = AccountSelectionMode;
  readonly category?: TransactionCategory;
  readonly transactionType: TransactionType;
  readonly currencySymbol: string;

  selectedPeriod: PeriodPreset;
  selectedPeriodValue: string;
  selectedStartDate: string;
  selectedEndDate: string;
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  transactionGroups: TransactionDateGroup[] = [];
  isLoading = false;
  hasError = false;
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly navService: NavigationService,
    private readonly filterTransactionsUseCase: FilterTransactionsUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase
  ) {
    const state = window.history.state as TransactionCategoryDetailState;
    this.category = state.category;
    this.transactionType = state.transactionType ?? 'gasto';
    this.currencySymbol = state.currencySymbol ?? 'S/';
    this.selectedPeriod = state.selectedPeriod ?? 'monthly';
    this.selectedPeriodValue = state.selectedPeriodValue ?? this.getCurrentMonth();
    this.selectedStartDate = state.startDate ?? this.getFirstDayOfCurrentMonth();
    this.selectedEndDate = state.endDate ?? this.getLastDayOfCurrentMonth();
    this.initialAccountIds = new Set(state.selectedAccountIds ?? []);
  }

  ngOnInit(): void {
    if (!this.category) return;
    this.isLoading = true;
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    this.transactionRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
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
    if (this.selectedAccounts.length === this.accounts.length) return 'Todas las cuentas';
    if (this.selectedAccounts.length === 1) return this.selectedAccounts[0].name;
    return `${this.selectedAccounts.length} cuentas`;
  }

  back(): void {
    void this.navService.back();
  }

  createTransaction(): void {
    if (!this.category) return;
    void this.navService.forward('/transactions/create', {
      category: this.category,
      transactionType: this.transactionType
    });
  }

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  applyPeriodFilter(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
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
    this.closeAccountSelector();
    this.loadTransactions();
  }

  retry(): void {
    this.loadTransactions();
  }

  trackByGroup(_: number, group: TransactionDateGroup): string {
    return group.date;
  }

  trackByTransaction(_: number, item: TransactionListEntry): number {
    return item.id;
  }

  openTransactionDetail(transaction: FilteredTransaction): void {
    void this.navService.forward(`/transactions/detail/${transaction.id}`, {
      transaction,
      currencySymbol: this.currencySymbol
    });
  }

  private loadTransactions(): void {
    if (!this.category) return;
    this.isLoading = true;
    this.hasError = false;
    this.transactionRequest?.unsubscribe();
    this.transactionRequest = this.filterTransactionsUseCase.execute({
      category_ids: [this.category.id],
      account_ids: this.selectedAccounts.map(account => account.id),
      start_date: this.selectedStartDate,
      end_date: this.selectedEndDate
    }).service({
      success: data => {
        const list = this.transactionType === 'gasto'
          ? data?.transactionList?.expensesList
          : data?.transactionList?.incomeList;
        this.allTransactions = (list ?? []).map(normalizeFilteredTransaction);
        this.applyLocalFilters();
        this.isLoading = false;
      },
      failure: () => {
        this.allTransactions = [];
        this.transactionGroups = [];
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        this.selectedAccounts = this.initialAccountIds.size
          ? this.accounts.filter(account => this.initialAccountIds.has(account.id))
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

  private applyLocalFilters(): void {
    const accountIds = new Set(this.selectedAccounts.map(account => account.id));
    const filterByAccount = this.accounts.length > 0 &&
      this.selectedAccounts.length < this.accounts.length;
    const transactions = this.allTransactions.filter(transaction => {
      const date = transaction.date.slice(0, 10);
      return date >= this.selectedStartDate &&
        date <= this.selectedEndDate &&
        (!filterByAccount || accountIds.has(transaction.account.id));
    });
    this.transactionGroups = this.groupByDate(transactions);
  }

  private groupByDate(transactions: FilteredTransaction[]): TransactionDateGroup[] {
    const groups = new Map<string, FilteredTransaction[]>();
    transactions.forEach(transaction => {
      const date = transaction.date.slice(0, 10);
      groups.set(date, [...(groups.get(date) ?? []), transaction]);
    });
    return Array.from(groups.entries())
      .sort(([first], [second]) => second.localeCompare(first))
      .map(([date, transactions]) => ({
        date,
        label: this.formatGroupDate(date),
        items: transactions
          .sort((first, second) => second.id - first.id)
          .map(transaction => this.toListItem(transaction))
      }));
  }

  private toListItem(transaction: FilteredTransaction): TransactionListEntry {
    return {
      id: transaction.id,
      transaction,
      view: {
        title: transaction.category.name,
        subtitle: transaction.account.name,
        icon: transaction.category.icon || this.category?.icon || 'bills',
        color: transaction.category.color || this.category?.color || 'var(--fv-primary)',
        amount: transaction.amount,
        currencySymbol: this.currencySymbol,
        amountTone: 'default'
      }
    };
  }

  private formatGroupDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));
  }

  private formatCompactDate(value: string): string {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit', month: 'short', timeZone: 'UTC'
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

  private formatDateInput(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
