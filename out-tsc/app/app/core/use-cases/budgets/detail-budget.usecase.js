import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/repositories/budgets.repository";
export class DetailBudgetUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(request) {
        return this.repository.getBudgetDetail(request);
    }
    static { this.ɵfac = function DetailBudgetUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailBudgetUseCase)(i0.ɵɵinject(i1.BudgetsRepository)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DetailBudgetUseCase, factory: DetailBudgetUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailBudgetUseCase, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.BudgetsRepository }], null); })();
//# sourceMappingURL=detail-budget.usecase.js.map