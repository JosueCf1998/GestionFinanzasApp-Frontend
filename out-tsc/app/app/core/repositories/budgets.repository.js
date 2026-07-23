import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import { BUDGETS_MOCK } from 'src/app/core/mocks/budgets.mock';
import { environment } from 'src/environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/api.service";
export class BudgetsRepository {
    constructor(apiService) {
        this.apiService = apiService;
    }
    listBudgets(request) {
        if (environment.useBudgetMocks) {
            return of({
                success: true,
                message: 'Mock Data',
                data: BUDGETS_MOCK,
                statusCode: 200,
                timestamp: new Date().toISOString()
            }).pipe(delay(250));
        }
        return this.apiService.post(ENDPOINTS.BUDGETS.LIST, request);
    }
    getBudgetDetail(request) {
        return this.apiService.post(ENDPOINTS.BUDGETS.DETAIL, request);
    }
    static { this.ɵfac = function BudgetsRepository_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BudgetsRepository)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BudgetsRepository, factory: BudgetsRepository.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BudgetsRepository, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=budgets.repository.js.map