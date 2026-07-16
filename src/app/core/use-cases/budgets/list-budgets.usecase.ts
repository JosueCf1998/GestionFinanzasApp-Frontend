import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  BudgetListItem,
  BudgetPeriod,
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
    return this.repository
      .listBudgets(request)
      .pipe(
        map(result => ({
          ...result,
          data: result.data
            ? this.mapApiResponse(
                result.data,
                this.buildDateRangeLabel(request)
              )
            : null
        }))
      );
  }

  private buildDateRangeLabel(request: ListBudgetsRequest): string {
    const startDate = this.parseDate(request.startDate);
    const endDate = this.parseDate(request.endDate);

    if (!startDate || !endDate) return '';

    return this.formatPeriodLabel(request.period, startDate, endDate);
  }

  private mapApiResponse(
    response: ListBudgetsApiResponse,
    dateRangeLabel: string
  ): ListBudgetsResponse {
    const items = response.presupuestos.map(budget => {
      if (!isBudgetStatus(budget.estado)) {
        throw new Error(`Estado de presupuesto no válido: ${budget.estado}`);
      }

      return {
        id: budget.id,
        name: budget.nombre,
        icon: budget.icono,
        color: budget.color,
        budgeted: budget.montoPresupuestado,
        used: budget.montoUtilizado,
        percentage: budget.porcentaje,
        status: budget.estado
      } satisfies BudgetListItem;
    });

    return {
      items,
      summary: {
        budgeted: response.presupuestoTotal,
        used: response.montoUtilizado,
        percentage: response.porcentajeUtilizado
      },
      dateRangeLabel
    };
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

}
