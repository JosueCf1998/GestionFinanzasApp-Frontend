import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { BUDGET_STATUS_LABELS } from 'src/app/core/models/budgets/list-budgets.model';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { FilterTransactionsUseCase } from 'src/app/core/use-cases/transactions/filter-transactions.usecase';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CategoryBudget } from '../detail-budget/detail-budget.page';
import 'src/app/core/utils/observable-extensions';

interface CategoryDetailNavigationState {
  category?: CategoryBudget;
  budgetName?: string;
  currency?: string;
  dateRangeLabel?: string;
  startDate?: string;
  endDate?: string;
}

interface TransactionDateGroup {
  date: string;
  label: string;
  transactions: FilteredTransaction[];
}

@Component({
  selector: 'app-detail-budget-category',
  templateUrl: './detail-budget-category.page.html',
  styleUrls: ['./detail-budget-category.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    ItemIconComponent,
    PageLayoutComponent,
    SectionCardComponent
  ]
})
export class DetailBudgetCategoryPage implements OnInit {
  readonly category: CategoryBudget;
  readonly budgetName: string;
  readonly currencySymbol: string;
  readonly dateRangeLabel: string;
  private readonly startDate: string;
  private readonly endDate: string;

  transactions: FilteredTransaction[] = [];
  transactionGroups: TransactionDateGroup[] = [];
  isLoadingTransactions = false;
  hasTransactionError = false;

  constructor(
    private readonly navService: NavigationService,
    private readonly filterTransactionsUseCase: FilterTransactionsUseCase
  ) {
    const state = window.history.state as CategoryDetailNavigationState;

    if (!state.category) {
      void this.navService.back();
      this.category = this.emptyCategory();
      this.budgetName = '';
      this.currencySymbol = 'S/';
      this.dateRangeLabel = '';
      this.startDate = '';
      this.endDate = '';
      return;
    }

    this.category = state.category;
    this.budgetName = state.budgetName ?? '';
    this.currencySymbol = state.currency === 'PEN' ? 'S/' : (state.currency ?? 'S/');
    this.dateRangeLabel = state.dateRangeLabel ?? '';
    this.startDate = state.startDate ?? '';
    this.endDate = state.endDate ?? '';
  }

  ngOnInit(): void {
    if (this.category.id > 0) {
      this.loadTransactions();
    }
  }

  get statusLabel(): string {
    return BUDGET_STATUS_LABELS[this.category.status];
  }

  get remainingLabel(): string {
    return this.category.status === 'EXCEEDED' ? 'Monto excedido' : 'Disponible';
  }

  get remainingAmount(): number {
    return this.category.status === 'EXCEEDED'
      ? Math.max(this.category.used - this.category.budgeted, 0)
      : Math.max(this.category.budgeted - this.category.used, 0);
  }

  get progressWidth(): number {
    return Math.min(Math.max(this.category.percentage, 0), 100);
  }

  loadTransactions(): void {
    this.isLoadingTransactions = true;
    this.hasTransactionError = false;

    this.filterTransactionsUseCase.execute({
      category_ids: [this.category.id],
      type: 'gasto'
    }).service({
      success: data => {
        this.transactions = (data?.items ?? []).filter(transaction =>
          this.isTransactionInBudgetPeriod(transaction.date)
        );
        this.transactionGroups = this.groupTransactionsByDate(this.transactions);
        this.isLoadingTransactions = false;
      },
      failure: () => {
        this.transactions = [];
        this.transactionGroups = [];
        this.isLoadingTransactions = false;
        this.hasTransactionError = true;
      }
    });
  }

  transactionTitle(transaction: FilteredTransaction): string {
    return transaction.description?.trim() || `Gasto en ${transaction.category.name}`;
  }

  trackByTransaction(_: number, transaction: FilteredTransaction): number {
    return transaction.id;
  }

  trackByTransactionGroup(_: number, group: TransactionDateGroup): string {
    return group.date;
  }

  backToBudget(): void {
    void this.navService.back();
  }

  private isTransactionInBudgetPeriod(value: string): boolean {
    if (!this.startDate || !this.endDate) return true;

    const transactionDate = value.slice(0, 10);
    return transactionDate >= this.startDate && transactionDate <= this.endDate;
  }

  private groupTransactionsByDate(
    transactions: FilteredTransaction[]
  ): TransactionDateGroup[] {
    const groups = new Map<string, FilteredTransaction[]>();

    transactions.forEach(transaction => {
      const date = transaction.date.slice(0, 10);
      const current = groups.get(date) ?? [];
      current.push(transaction);
      groups.set(date, current);
    });

    return Array.from(groups.entries())
      .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
      .map(([date, items]) => ({
        date,
        label: this.formatDateGroupLabel(date),
        transactions: items
      }));
  }

  private formatDateGroupLabel(value: string): string {
    const [year, month, day] = value.split('-');
    if (!year || !month || !day) return value.toUpperCase();

    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
      .format(new Date(`${value}T00:00:00Z`))
      .toUpperCase();
  }

  private emptyCategory(): CategoryBudget {
    return {
      id: 0,
      name: '',
      icon: 'category',
      color: '#4361ee',
      budgeted: 0,
      used: 0,
      remaining: 0,
      percentage: 0,
      status: 'ON_TRACK'
    };
  }
}
