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
import { AmountListItemComponent } from 'src/app/shared/components/amount-list-item/amount-list-item.component';
import { DonutChartSegment } from 'src/app/shared/components/donut-chart/donut-chart.component';
import { PeriodSummaryCardComponent } from 'src/app/shared/components/period-summary-card/period-summary-card.component';
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
    CustomSegmentComponent,
    FeatureHeaderComponent,
    FloatingActionButtonComponent,
    ItemIconComponent,
    SectionCardComponent,
    AmountListItemComponent,
    PeriodSummaryCardComponent
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
    return this.selectedType === 'gasto' ? 'Total de gastos' : 'Total de ingresos';
  }

  get amountPrefix(): string {
    return this.selectedType === 'gasto' ? '−' : '+';
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
    if (!this.transactions.length) return 'Sin movimientos registrados';

    const dates = this.transactions
      .map(transaction => transaction.date.slice(0, 10))
      .sort();

    const firstDate = this.formatShortDate(dates[0]);
    const lastDate = this.formatShortDate(dates[dates.length - 1]);
    return firstDate === lastDate ? firstDate : `${firstDate} – ${lastDate}`;
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
        this.transactions = [...(data?.items ?? [])].sort(
          (first, second) =>
            second.date.localeCompare(first.date) || second.id - first.id
        );
        this.isLoading = false;
      },
      failure: () => {
        this.transactions = [];
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  createTransaction(): void {
    void this.navService.forward('/home/create');
  }

  trackByTransaction(_: number, transaction: FilteredTransaction): number {
    return transaction.id;
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
}
