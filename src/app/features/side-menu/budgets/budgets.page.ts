import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';
import {
  FilterModalComponent,
  FilterPeriodGroup,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import {
  CURRENCIES,
  Currency,
  CurrencyCode,
  getCurrency
} from 'src/app/shared/models/currency.model';

type BudgetPeriod = 'weekly' | 'monthly' | 'annual' | 'custom';
type BudgetStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';

interface BudgetListItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  percentage: number;
  status: BudgetStatus;
  statusLabel: string;
}

interface BaseBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  currencyCode: CurrencyCode;
  monthlyBudget: number;
  monthlyUsed: number;
}

interface PeriodConfiguration {
  options: string[];
  budgetScale: number;
  usageScale: number;
}

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    FeatureHeaderComponent,
    FilterModalComponent
  ]
})
export class BudgetsPage {
  selectedPeriod: BudgetPeriod = 'monthly';
  selectedPeriodIndex = 0;
  selectedCurrencyCode: CurrencyCode = 'PEN';
  isPeriodSelectorOpen = false;

  readonly currencyOptions: Currency[] = [CURRENCIES.PEN, CURRENCIES.USD];

  readonly periodOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'annual', label: 'Anual' },
    { value: 'custom', label: 'Personalizado' }
  ];

  private readonly selectionUsageFactors = [1, 0.82, 1.08];

  private readonly periodConfigurations: Record<BudgetPeriod, PeriodConfiguration> = {
    weekly: {
      options: ['14 - 20 julio 2026', '7 - 13 julio 2026', '21 - 27 julio 2026'],
      budgetScale: 0.25,
      usageScale: 0.88
    },
    monthly: {
      options: ['Julio 2026', 'Junio 2026', 'Agosto 2026'],
      budgetScale: 1,
      usageScale: 1
    },
    annual: {
      options: ['Año 2026', 'Año 2025', 'Año 2027'],
      budgetScale: 12,
      usageScale: 0.74
    },
    custom: {
      options: [
        'Julio - septiembre 2026',
        'Enero - junio 2026',
        'Octubre - diciembre 2026'
      ],
      budgetScale: 3,
      usageScale: 0.91
    }
  };

  private readonly baseBudgets: BaseBudget[] = [
    {
      id: 1,
      name: 'Presupuesto Hogar',
      icon: 'home',
      color: '#4361ee',
      currencyCode: 'PEN',
      monthlyBudget: 1200,
      monthlyUsed: 900
    },
    {
      id: 2,
      name: 'Presupuesto Personal',
      icon: 'user',
      color: '#8b5cf6',
      currencyCode: 'USD',
      monthlyBudget: 1000,
      monthlyUsed: 920
    },
    {
      id: 3,
      name: 'Viaje a Cusco',
      icon: 'bus',
      color: '#ec4899',
      currencyCode: 'USD',
      monthlyBudget: 600,
      monthlyUsed: 630
    },
    {
      id: 4,
      name: 'EIKON Operativo',
      icon: 'account',
      color: '#3a0ca3',
      currencyCode: 'PEN',
      monthlyBudget: 1000,
      monthlyUsed: 670
    }
  ];

  constructor(private readonly navService: NavigationService) {}

  get availablePeriods(): string[] {
    return this.periodConfigurations[this.selectedPeriod].options;
  }

  get filterPeriodGroups(): FilterPeriodGroup[] {
    return this.periodOptions.map(option => ({
      frequency: option.value,
      periods: this.periodConfigurations[option.value as BudgetPeriod].options
    }));
  }

  get selectedDate(): string {
    return this.availablePeriods[this.selectedPeriodIndex];
  }

  get selectedPeriodLabel(): string {
    return this.periodOptions.find(option => option.value === this.selectedPeriod)?.label ?? '';
  }

  get currency(): Currency {
    return getCurrency(this.selectedCurrencyCode);
  }

  get budgets(): BudgetListItem[] {
    const configuration = this.periodConfigurations[this.selectedPeriod];
    const selectionFactor = this.selectionUsageFactors[this.selectedPeriodIndex] ?? 1;

    return this.baseBudgets
      .filter(baseBudget => baseBudget.currencyCode === this.selectedCurrencyCode)
      .map(baseBudget => {
        const budgeted = this.roundAmount(baseBudget.monthlyBudget * configuration.budgetScale);
        const used = this.roundAmount(
          baseBudget.monthlyUsed *
          configuration.budgetScale *
          configuration.usageScale *
          selectionFactor
        );
        const percentage = budgeted > 0 ? Math.round((used / budgeted) * 100) : 0;
        const status = this.resolveStatus(percentage);

        return {
          id: baseBudget.id,
          name: baseBudget.name,
          icon: baseBudget.icon,
          color: baseBudget.color,
          budgeted,
          used,
          percentage,
          status,
          statusLabel: this.resolveStatusLabel(status)
        };
      });
  }

  get summary(): { dateLabel: string; budgeted: number; used: number; percentage: number } {
    const totals = this.budgets.reduce(
      (result, budget) => ({
        budgeted: result.budgeted + budget.budgeted,
        used: result.used + budget.used
      }),
      { budgeted: 0, used: 0 }
    );

    return {
      dateLabel: this.getSummaryLabel(),
      budgeted: totals.budgeted,
      used: totals.used,
      percentage: totals.budgeted > 0
        ? Math.round((totals.used / totals.budgeted) * 100)
        : 0
    };
  }

  openPeriodSelector(): void {
    this.isPeriodSelectorOpen = true;
  }

  closePeriodSelector(): void {
    this.isPeriodSelectorOpen = false;
  }

  applyFilters(selection: FilterSelection): void {
    this.selectedPeriod = selection.frequency as BudgetPeriod;
    this.selectedCurrencyCode = selection.currencyCode;
    this.selectedPeriodIndex = selection.periodIndex;
    this.closePeriodSelector();
  }

  openBudget(budget: BudgetListItem): void {
    this.navService.forward('/budgets/detail', {
      budgetId: budget.id,
      frequency: this.selectedPeriod,
      period: this.selectedDate,
      currency: this.currency.code
    });
  }

  showArchivedBudgets(): void {
    console.log('Mostrar presupuestos archivados');
  }

  trackByBudget(_: number, budget: BudgetListItem): number {
    return budget.id;
  }

  private resolveStatus(percentage: number): BudgetStatus {
    if (percentage >= 100) {
      return 'EXCEEDED';
    }

    if (percentage >= 85) {
      return 'WARNING';
    }

    return 'ON_TRACK';
  }

  private resolveStatusLabel(status: BudgetStatus): string {
    const labels: Record<BudgetStatus, string> = {
      ON_TRACK: 'En objetivo',
      WARNING: 'Tendencia al exceso',
      EXCEEDED: 'Excedido'
    };

    return labels[status];
  }

  private getSummaryLabel(): string {
    const labels: Record<BudgetPeriod, string> = {
      weekly: `Semana ${this.selectedDate}`,
      monthly: this.selectedDate,
      annual: this.selectedDate,
      custom: 'Periodo personalizado'
    };

    return labels[this.selectedPeriod];
  }

  private roundAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}
