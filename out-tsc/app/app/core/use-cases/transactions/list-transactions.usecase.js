import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../repositories/transactions.repository";
export class ListTransactionsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute() {
        return this.repository.listTransactions();
    }
    static { this.ɵfac = function ListTransactionsUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListTransactionsUseCase)(i0.ɵɵinject(i1.TransactionRepository)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListTransactionsUseCase, factory: ListTransactionsUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListTransactionsUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.TransactionRepository }], null); })();
//# sourceMappingURL=list-transactions.usecase.js.map