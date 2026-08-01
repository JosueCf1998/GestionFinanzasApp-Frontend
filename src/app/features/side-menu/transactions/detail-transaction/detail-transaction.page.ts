import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { formatTransactionDate, formatTransactionRegistrationDate } from 'src/app/core/utils/transaction.util';
import { DetailSummaryCardComponent, DetailSummaryCardData } from 'src/app/shared/components/detail-summary-card/detail-summary-card.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { InformationCardComponent, InformationCardItem } from 'src/app/shared/components/information-card/information-card.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

interface TransactionDetailState {
  transaction?: FilteredTransaction;
  currencySymbol?: string;
}

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.page.html',
  styleUrl: './detail-transaction.page.scss',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    EmptyStateComponent,
    ItemIconComponent,
    PageLayoutComponent,
    DetailSummaryCardComponent,
    InformationCardComponent
  ]
})
export class DetailTransactionPage {
  readonly transaction?: FilteredTransaction;
  readonly currencySymbol: string;
  readonly summaryData?: DetailSummaryCardData;
  readonly informationItems: InformationCardItem[];

  constructor(private readonly navService: NavigationService) {
    const state = window.history.state as TransactionDetailState;
    this.transaction = state.transaction;
    this.currencySymbol = state.currencySymbol ?? 'S/';
    this.summaryData = this.transaction ? {
      eyebrow: this.transaction.type === 'income' ? 'Ingreso' : 'Gasto',
      title: this.transaction.category.name,
      subtitle: formatTransactionDate(this.transaction.date),
      icon: this.transaction.category.icon,
      iconColor: this.transaction.category.color,
      amount: this.transaction.amount,
      currencySymbol: this.currencySymbol
    } : undefined;
    const description = this.transaction?.description?.trim();
    this.informationItems = this.transaction ? [
      { label: 'Cuenta', value: this.transaction.account.name },
      { label: 'Tipo de movimiento', value: this.transaction.type === 'income' ? 'Ingreso' : 'Gasto' },
      ...(description ? [{ label: 'Descripción', value: description }] : []),
      { label: 'Fecha de registro', value: formatTransactionRegistrationDate(this.transaction.createdAt) },
      { label: 'N.º de operación', value: `#${this.transaction.id}` }
    ] : [];
  }

  back(): void {
    void this.navService.back();
  }

  editTransaction(): void {
    if (!this.transaction) return;
    void this.navService.push(`/transactions/${this.transaction.id}/edit`, { transaction: this.transaction });
  }
}
