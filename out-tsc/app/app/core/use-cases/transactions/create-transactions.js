import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../repositories/transactions.repository";
export class CreateTransactionsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(body) {
        return this.repository.createTransactions(body);
    }
    static { this.ɵfac = function CreateTransactionsUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateTransactionsUseCase)(i0.ɵɵinject(i1.TransactionRepository)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CreateTransactionsUseCase, factory: CreateTransactionsUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateTransactionsUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.TransactionRepository }], null); })();
//# sourceMappingURL=create-transactions.js.map