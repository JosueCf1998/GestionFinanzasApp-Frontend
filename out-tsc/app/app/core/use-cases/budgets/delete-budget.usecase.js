import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/api.service";
export class DeleteBudgetUseCase {
    constructor(apiService) {
        this.apiService = apiService;
    }
    execute(request) {
        return this.apiService.post(ENDPOINTS.BUDGETS.DELETE, request);
    }
    static { this.ɵfac = function DeleteBudgetUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DeleteBudgetUseCase)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DeleteBudgetUseCase, factory: DeleteBudgetUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DeleteBudgetUseCase, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=delete-budget.usecase.js.map