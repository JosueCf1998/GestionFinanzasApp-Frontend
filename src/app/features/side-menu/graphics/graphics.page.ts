import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import {
  Accounts,
  ListAccountsUseCase
} from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FilterTriggerComponent } from 'src/app/shared/components/filter-trigger/filter-trigger.component';
import {
  InformationCardComponent,
  InformationCardItem
} from 'src/app/shared/components/information-card/information-card.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';

interface FinancialMetric {
  label: string;
  amount: number;
  tone: 'income' | 'expense' | 'period' | 'balance';
  icon?: string;
  iconColor?: string;
}

interface PeriodGraphicCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  tone: 'violet' | 'blue' | 'cyan' | 'amber' | 'rose' | 'indigo';
  label: string;
}

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AccountSelectorModalComponent,
    FeatureHeaderComponent,
    FilterModalComponent,
    FilterTriggerComponent,
    InformationCardComponent,
    ItemIconComponent,
    SectionCardComponent
  ]
})
export class GraphicsPage implements OnInit, OnDestroy {
  private accountRequest?: Subscription;

  readonly AccountSelectionMode = AccountSelectionMode;
  readonly currencySymbol = 'S/.';

  selectedPeriod: PeriodPreset = 'custom';
  selectedPeriodValue = '';
  selectedStartDate = '2026-01-01';
  selectedEndDate = '2026-08-31';
  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  isPeriodSelectorOpen = false;
  isAccountSelectorOpen = false;

  readonly metrics: FinancialMetric[] = [
    { label: 'Ingresos', amount: 18400, tone: 'income', icon: 'up-trend', iconColor: 'var(--fv-success)' },
    { label: 'Gastos', amount: 13950, tone: 'expense', icon: 'down-trend', iconColor: 'var(--fv-danger)' },
    { label: 'Saldo del periodo', amount: 4450, tone: 'period' },
    { label: 'Saldo actual', amount: 5650, tone: 'balance' }
  ];

  readonly summaryItems: InformationCardItem[] = [
    { label: 'Presupuesto total', value: 'S/. 15,000.00' },
    { label: 'Presupuesto gastado', value: 'S/. 13,950.00' },
    { label: 'Presupuesto restante', value: 'S/. 1,050.00' },
    { label: 'Ahorro del periodo', value: '24.18%', emphasis: true }
  ];

  readonly periodGraphicCards: PeriodGraphicCard[] = [
    {
      title: 'Gastos por categoría',
      description: 'Revisa en qué categorías gastas más.',
      icon: 'category',
      route: '/main/transactions',
      tone: 'violet',
      label: 'Gastos'
    },
    {
      title: 'Ingresos vs Gastos',
      description: 'Compara tus movimientos del periodo.',
      icon: 'transfer',
      route: '/main/transactions',
      tone: 'blue',
      label: 'Comparativa'
    },
    {
      title: 'Evolución del saldo',
      description: 'Consulta el estado actual de tus saldos.',
      icon: 'up-trend',
      route: '/main/accounts',
      tone: 'cyan',
      label: 'Tendencia'
    },
    {
      title: 'Progreso de presupuestos',
      description: 'Controla el avance de tus presupuestos.',
      icon: 'budget-wallet',
      route: '/main/budgets',
      tone: 'amber',
      label: 'Presupuestos'
    },
    {
      title: 'Top categorías de gastos',
      description: 'Identifica tus principales categorías.',
      icon: 'bills',
      route: '/main/transactions',
      tone: 'rose',
      label: 'Ranking'
    },
    {
      title: 'Análisis por cuentas',
      description: 'Consulta el balance de cada cuenta.',
      icon: 'account',
      route: '/main/accounts',
      tone: 'indigo',
      label: 'Cuentas'
    }
  ];

  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    this.accountRequest?.unsubscribe();
  }

  get selectedPeriodLabel(): string {
    return {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Rango de fechas'
    }[this.selectedPeriod];
  }

  get compactDateRange(): string {
    return `${this.formatDate(this.selectedStartDate)} – ${this.formatDate(this.selectedEndDate)}`;
  }

  get selectedAccountLabel(): string {
    if (!this.accounts.length) return 'Sin cuentas';
    if (this.selectedAccounts.length === this.accounts.length) return 'Todas las cuentas';
    if (this.selectedAccounts.length === 1) return this.selectedAccounts[0].name;
    return `${this.selectedAccounts.length} cuentas`;
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
  }

  openPeriodGraphic(card: PeriodGraphicCard): void {
    void this.navigationService.forward(card.route, {
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      selectedAccountIds: this.selectedAccounts.map(account => account.id)
    });
  }

  private loadAccounts(): void {
    this.accountRequest?.unsubscribe();
    this.accountRequest = this.listAccountsUseCase.listAccounts().subscribe({
      next: result => {
        this.accounts = result.success ? result.data?.items ?? [] : [];
        this.selectedAccounts = [...this.accounts];
      },
      error: () => {
        this.accounts = [];
        this.selectedAccounts = [];
      }
    });
  }

  private formatDate(value: string): string {
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
