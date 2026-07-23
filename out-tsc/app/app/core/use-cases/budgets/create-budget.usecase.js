import { Injectable } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/api.service";
export class CreateBudgetUseCase {
    constructor(apiService) {
        this.apiService = apiService;
    }
    execute(request) {
        return this.apiService.post(ENDPOINTS.BUDGETS.CREATE, request);
    }
    static { this.ɵfac = function CreateBudgetUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateBudgetUseCase)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CreateBudgetUseCase, factory: CreateBudgetUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateBudgetUseCase, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=create-budget.usecase.js.map