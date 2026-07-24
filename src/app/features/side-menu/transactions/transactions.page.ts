import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { Subscription } from 'rxjs';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
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
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import 'src/app/core/utils/observable-extensions';

type TransactionType = 'gasto' | 'ingreso';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrl: './transactions.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    AccountSelectorModalComponent,
    CustomSegmentComponent,
    FeatureHeaderComponent,
    FloatingActionButtonComponent,
    ItemIconComponent,
    SectionCardComponent,
    AmountListItemComponent,
    PeriodSummaryCardComponent,
    FilterModalComponent
  ]
})
export class TransactionsPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) private content?: IonContent;

  private transactionRequest?: Subscription;
  private accountRequest?: Subscription;
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
  private allTransactions: FilteredTransaction[] = [];
  transactions: FilteredTransaction[] = [];
  isLoading = false;
  hasError = false;
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  constructor(
    private readonly filterTransactionsUseCase: FilterTransactionsUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly navService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.transactionRequest?.unsubscribe();
    this.accountRequest?.unsubscribe();
  }

  ionViewWillEnter(): void {
    void this.content?.scrollToTop(0);
  }

  get totalAmount(): number {
    return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
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
    if (this.selectedAccounts.length === 1) {
      return this.selectedAccounts[0].name;
    }
    return `${this.selectedAccounts.length} cuentas`;
  }

  changeType(value: string): void {
    if (value !== 'gasto' && value !== 'ingreso') return;

    this.selectedType = value;
    this.loadTransactions();
  }

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  applyFilters(selection: FilterSelection): void {
    this.selectedPeriod = selection.period;
    this.selectedPeriodValue = selection.periodValue;
    this.selectedStartDate = selection.startDate;
    this.selectedEndDate = selection.endDate;
    this.closePeriodSelector();
    this.applyLocalFilters();
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
    this.applyLocalFilters();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.hasError = false;

    this.transactionRequest?.unsubscribe();
    this.transactionRequest = this.filterTransactionsUseCase.execute({
      type: this.selectedType
    }).service({
      success: data => {
        this.allTransactions = [...(data?.items ?? [])];
        this.applyLocalFilters();
        this.isLoading = false;
      },
      failure: () => {
        this.allTransactions = [];
        this.transactions = [];
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  createTransaction(): void {
    void this.navService.forward('/transactions/create');
  }

  trackByTransaction(_: number, transaction: FilteredTransaction): number {
    return transaction.id;
  }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        this.selectedAccounts = [...this.accounts];
        this.applyLocalFilters();
      },
      failure: () => {
        this.accounts = [];
        this.selectedAccounts = [];
      }
    });
  }

  private applyLocalFilters(): void {
    const selectedAccountIds = new Set(
      this.selectedAccounts.map(account => account.id)
    );
    const filterByAccount = this.accounts.length > 0 &&
      this.selectedAccounts.length < this.accounts.length;

    this.transactions = this.allTransactions
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

    requestAnimationFrame(() => {
      void this.content?.scrollToTop(0);
    });
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
