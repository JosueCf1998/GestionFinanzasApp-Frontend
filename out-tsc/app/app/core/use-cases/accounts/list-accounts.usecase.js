import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
export class ListAccountsUseCase {
    constructor(apiService) {
        this.apiService = apiService;
    }
    listAccounts() {
        const endpoint = 'accounts/list';
        return this.apiService.get(endpoint);
    }
    static { this.ɵfac = function ListAccountsUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListAccountsUseCase)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListAccountsUseCase, factory: ListAccountsUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListAccountsUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=list-accounts.usecase.js.map