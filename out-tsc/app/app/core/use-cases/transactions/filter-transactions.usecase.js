import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/repositories/transactions.repository";
export class FilterTransactionsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(request) {
        return this.repository.filterTransactions(request);
    }
    static { this.ɵfac = function FilterTransactionsUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterTransactionsUseCase)(i0.ɵɵinject(i1.TransactionRepository)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FilterTransactionsUseCase, factory: FilterTransactionsUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterTransactionsUseCase, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.TransactionRepository }], null); })();
//# sourceMappingURL=filter-transactions.usecase.js.map