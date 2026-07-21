import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  BudgetApiItem,
  BudgetListItem,
  isBudgetStatus,
  ListBudgetsApiResponse,
  ListBudgetsRequest,
  ListBudgetsResponse
} from 'src/app/core/models/budgets/list-budgets.model';
import { Result } from 'src/app/core/models/result.model';
import { BudgetsRepository } from 'src/app/core/repositories/budgets.repository';

@Injectable({ providedIn: 'root' })
export class ListBudgetsUseCase {
  constructor(private readonly repository: BudgetsRepository) {}

  execute(request: ListBudgetsRequest): Observable<Result<ListBudgetsResponse>> {
    return this.repository.listBudgets(request).pipe(
      tap(result => console.log('Respuesta original del API de presupuestos:', result)),
      map(result => ({
        ...result,
        data: result.data
          ? this.mapApiResponse(result.data, this.buildDateRangeLabel(request))
          : null
      }))
    );
  }

  private buildDateRangeLabel(request: ListBudgetsRequest): string {
    const startDate = this.parseDate(request.startDate);
    const endDate = this.parseDate(request.endDate);

    if (!startDate || !endDate) return '';

    return this.formatDateRangeLabel(startDate, endDate);
  }

  private mapApiResponse(
    response: ListBudgetsApiResponse,
    dateRangeLabel: string
  ): ListBudgetsResponse {
    const items = (response.budgetList ?? []).map(budget =>
      this.mapBudgetItem(budget)
    );

    return {
      items,
      summary: {
        budgeted: response.totalBudget,
        used: response.totalSpent,
        percentage: response.usagePercentage
      },
      dateRangeLabel
    };
  }

  private mapBudgetItem(budget: BudgetApiItem): BudgetListItem {
    if (!isBudgetStatus(budget.status)) {
      throw new Error(`Estado de presupuesto no válido: ${budget.status}`);
    }

    return {
      id: budget.id,
      name: budget.name,
      icon: budget.icon,
      color: budget.color,
      budgeted: budget.budgetAmount,
      used: budget.spentAmount,
      percentage: budget.percentage,
      status: budget.status
    };
  }

  private parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private formatDateRangeLabel(startDate: Date, endDate: Date): string {
    if (this.isFullCalendarMonth(startDate, endDate)) {
      return this.getFormatter({ month: 'long', year: 'numeric' }).format(startDate);
    }

    if (this.isFullCalendarYear(startDate, endDate)) {
      return `Año ${startDate.getUTCFullYear()}`;
    }

    const formatter = this.getFormatter({ day: 'numeric', month: 'short', year: 'numeric' });
    return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
  }

  private isFullCalendarMonth(startDate: Date, endDate: Date): boolean {
    if (startDate.getUTCDate() !== 1) return false;

    const expectedEnd = new Date(Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth() + 1,
      0
    ));

    return endDate.getTime() === expectedEnd.getTime();
  }

  private isFullCalendarYear(startDate: Date, endDate: Date): boolean {
    return startDate.getUTCMonth() === 0 &&
      startDate.getUTCDate() === 1 &&
      endDate.getUTCFullYear() === startDate.getUTCFullYear() &&
      endDate.getUTCMonth() === 11 &&
      endDate.getUTCDate() === 31;
  }

  private getFormatter(options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
    return new Intl.DateTimeFormat('es-PE', { ...options, timeZone: 'UTC' });
  }

}
