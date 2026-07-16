import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  BudgetListItem,
  BudgetPeriod,
  BudgetStatus,
  ListBudgetsRequest,
  ListBudgetsResponse
} from 'src/app/core/models/budgets/list-budgets.model';
import { Result } from 'src/app/core/models/result.model';
import { CurrencyCode } from 'src/app/shared/models/currency.model';

interface BudgetSource {
  id: number;
  name: string;
  icon: string;
  color: string;
  currencyCode: CurrencyCode;
  monthlyBudget: number;
  monthlyUsed: number;
}

@Injectable({ providedIn: 'root' })
export class ListBudgetsUseCase {
  private readonly averageDaysPerMonth = 365.25 / 12;

  private readonly budgetSource: BudgetSource[] = [
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
      currencyCode: 'PEN',
      monthlyBudget: 1000,
      monthlyUsed: 920
    },
    {
      id: 3,
      name: 'Viaje a Cusco',
      icon: 'bus',
      color: '#ec4899',
      currencyCode: 'PEN',
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

  execute(request: ListBudgetsRequest): Observable<Result<ListBudgetsResponse>> {
    const startDate = this.parseDate(request.startDate);
    const endDate = this.parseDate(request.endDate);

    if (!startDate || !endDate || startDate > endDate) {
      return of<Result<ListBudgetsResponse>>({
        success: false,
        message: 'El rango de fechas no es válido.',
        data: null,
        statusCode: 400,
        timestamp: new Date().toISOString()
      });
    }

    const rangeDays = Math.floor((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    const rangeScale = rangeDays / this.averageDaysPerMonth;
    const dateRangeLabel = this.formatPeriodLabel(request.period, startDate, endDate);

    const items = this.budgetSource.map(budget => this.mapBudget(budget, rangeScale));

    const totals = items.reduce(
      (result, budget) => ({
        budgeted: result.budgeted + budget.budgeted,
        used: result.used + budget.used
      }),
      { budgeted: 0, used: 0 }
    );

    const response: ListBudgetsResponse = {
      items,
      summary: {
        dateLabel: dateRangeLabel,
        budgeted: totals.budgeted,
        used: totals.used,
        percentage: totals.budgeted > 0
          ? Math.round((totals.used / totals.budgeted) * 100)
          : 0
      },
      dateRangeLabel
    };

    return of<Result<ListBudgetsResponse>>({
      success: true,
      message: 'Presupuestos obtenidos correctamente.',
      data: response,
      statusCode: 200,
      timestamp: new Date().toISOString()
    }).pipe(delay(250));
  }

  private mapBudget(
    budget: BudgetSource,
    rangeScale: number
  ): BudgetListItem {
    const budgeted = this.roundAmount(budget.monthlyBudget * rangeScale);
    const used = this.roundAmount(budget.monthlyUsed * rangeScale);
    const percentage = budgeted > 0 ? Math.round((used / budgeted) * 100) : 0;
    const status = this.resolveStatus(percentage);

    return {
      id: budget.id,
      name: budget.name,
      icon: budget.icon,
      color: budget.color,
      currencyCode: budget.currencyCode,
      budgeted,
      used,
      percentage,
      status,
      statusLabel: this.resolveStatusLabel(status)
    };
  }

  private resolveStatus(percentage: number): BudgetStatus {
    if (percentage >= 100) return 'EXCEEDED';
    if (percentage >= 85) return 'WARNING';
    return 'ON_TRACK';
  }

  private resolveStatusLabel(status: BudgetStatus): string {
    return {
      ON_TRACK: 'En objetivo',
      WARNING: 'Tendencia al exceso',
      EXCEEDED: 'Excedido'
    }[status];
  }

  private parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private formatPeriodLabel(period: BudgetPeriod, startDate: Date, endDate: Date): string {
    if (period === 'monthly') {
      return new Intl.DateTimeFormat('es-PE', {
        month: 'long', year: 'numeric', timeZone: 'UTC'
      }).format(startDate);
    }

    if (period === 'annual') return `Año ${startDate.getUTCFullYear()}`;

    const formatter = new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    });

    const range = `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
    return period === 'weekly' ? `Semana: ${range}` : range;
  }

  private roundAmount(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}
