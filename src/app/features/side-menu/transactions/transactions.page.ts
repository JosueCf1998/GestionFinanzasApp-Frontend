import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { FilterTransactionsUseCase } from 'src/app/core/use-cases/transactions/filter-transactions.usecase';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import 'src/app/core/utils/observable-extensions';

type TransactionType = 'gasto' | 'ingreso';

interface TransactionDateGroup {
  date: string;
  label: string;
  transactions: FilteredTransaction[];
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrl: './transactions.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    CustomSegmentComponent,
    FeatureHeaderComponent,
    FloatingActionButtonComponent,
    ItemIconComponent,
    SectionCardComponent
  ]
})
export class TransactionsPage implements OnInit {
  readonly transactionTypes = [
    { value: 'gasto', label: 'Gastos' },
    { value: 'ingreso', label: 'Ingresos' }
  ];
  readonly currencySymbol = 'S/';

  selectedType: TransactionType = 'gasto';
  transactions: FilteredTransaction[] = [];
  transactionGroups: TransactionDateGroup[] = [];
  isLoading = false;
  hasError = false;

  constructor(
    private readonly filterTransactionsUseCase: FilterTransactionsUseCase,
    private readonly navService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  get totalAmount(): number {
    return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  get totalLabel(): string {
    return this.selectedType === 'gasto' ? 'Total gastado' : 'Total recibido';
  }

  get movementLabel(): string {
    const count = this.transactions.length;
    return `${count} ${count === 1 ? 'movimiento' : 'movimientos'}`;
  }

  changeType(value: string): void {
    if (value !== 'gasto' && value !== 'ingreso') return;

    this.selectedType = value;
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.hasError = false;

    this.filterTransactionsUseCase.execute({
      type: this.selectedType
    }).service({
      success: data => {
        this.transactions = data?.items ?? [];
        this.transactionGroups = this.groupTransactionsByDate(this.transactions);
        this.isLoading = false;
      },
      failure: () => {
        this.transactions = [];
        this.transactionGroups = [];
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  createTransaction(): void {
    void this.navService.forward('/home/create');
  }

  transactionTitle(transaction: FilteredTransaction): string {
    return transaction.description?.trim() || transaction.category.name;
  }

  transactionSign(): string {
    return this.selectedType === 'gasto' ? '−' : '+';
  }

  trackByTransaction(_: number, transaction: FilteredTransaction): number {
    return transaction.id;
  }

  trackByTransactionGroup(_: number, group: TransactionDateGroup): string {
    return group.date;
  }

  private groupTransactionsByDate(
    transactions: FilteredTransaction[]
  ): TransactionDateGroup[] {
    const groups = new Map<string, FilteredTransaction[]>();

    transactions.forEach(transaction => {
      const date = transaction.date.slice(0, 10);
      groups.set(date, [...(groups.get(date) ?? []), transaction]);
    });

    return Array.from(groups.entries())
      .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
      .map(([date, items]) => ({
        date,
        label: this.formatDate(date),
        transactions: items
      }));
  }

  private formatDate(value: string): string {
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
}
