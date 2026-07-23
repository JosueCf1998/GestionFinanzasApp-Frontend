import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
export class ListCategoriesUseCase {
    constructor(apiService) {
        this.apiService = apiService;
        this.gastos = [];
        this.ingresos = [];
    }
    execute() {
        const endpoint = 'categories/list';
        return this.apiService.get(endpoint);
    }
    static { this.ɵfac = function ListCategoriesUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListCategoriesUseCase)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListCategoriesUseCase, factory: ListCategoriesUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListCategoriesUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=list-categories.usecase.js.map