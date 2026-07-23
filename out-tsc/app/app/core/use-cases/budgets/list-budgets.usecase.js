import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { isBudgetStatus } from 'src/app/core/models/budgets/list-budgets.model';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/repositories/budgets.repository";
export class ListBudgetsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(request) {
        return this.repository.listBudgets(request).pipe(map(result => ({
            ...result,
            data: result.data
                ? this.mapApiResponse(result.data, this.buildDateRangeLabel(request))
                : null
        })));
    }
    buildDateRangeLabel(request) {
        const startDate = this.parseDate(request.startDate);
        const endDate = this.parseDate(request.endDate);
        if (!startDate || !endDate)
            return '';
        return this.formatDateRangeLabel(startDate, endDate);
    }
    mapApiResponse(response, dateRangeLabel) {
        const items = (response.budgetList ?? []).map(budget => this.mapBudgetItem(budget));
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
    mapBudgetItem(budget) {
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
    parseDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
            return null;
        const date = new Date(`${value}T00:00:00Z`);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    formatDateRangeLabel(startDate, endDate) {
        if (this.isFullCalendarMonth(startDate, endDate)) {
            return this.getFormatter({ month: 'long', year: 'numeric' }).format(startDate);
        }
        if (this.isFullCalendarYear(startDate, endDate)) {
            return `Año ${startDate.getUTCFullYear()}`;
        }
        const formatter = this.getFormatter({ day: 'numeric', month: 'short', year: 'numeric' });
        return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
    }
    isFullCalendarMonth(startDate, endDate) {
        if (startDate.getUTCDate() !== 1)
            return false;
        const expectedEnd = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 0));
        return endDate.getTime() === expectedEnd.getTime();
    }
    isFullCalendarYear(startDate, endDate) {
        return startDate.getUTCMonth() === 0 &&
            startDate.getUTCDate() === 1 &&
            endDate.getUTCFullYear() === startDate.getUTCFullYear() &&
            endDate.getUTCMonth() === 11 &&
            endDate.getUTCDate() === 31;
    }
    getFormatter(options) {
        return new Intl.DateTimeFormat('es-PE', { ...options, timeZone: 'UTC' });
    }
    static { this.ɵfac = function ListBudgetsUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListBudgetsUseCase)(i0.ɵɵinject(i1.BudgetsRepository)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListBudgetsUseCase, factory: ListBudgetsUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListBudgetsUseCase, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.BudgetsRepository }], null); })();
//# sourceMappingURL=list-budgets.usecase.js.map