import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TRANSACTIONS_MOCK } from "../mocks/transactions.mock";
import { ENDPOINTS } from "../constants/endpoints";
import { encryptBody } from "../utils/encryption.util";
import { CREATE_TRANSACTION_REQUEST_MAP } from "../constants/transactions/create-transaction.constants";
import { mapObjectKeys } from "../utils/mapping.util";
import * as i0 from "@angular/core";
import * as i1 from "../services/api.service";
import * as i2 from "../services/encryption.service";
export class TransactionRepository {
    constructor(apiService, encryptionService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
    }
    listTransactions() {
        const endpoint = ENDPOINTS.TRANSACTIONS.LIST;
        if (environment.useMocks) {
            return of({
                success: true,
                message: "Mock Data",
                data: TRANSACTIONS_MOCK,
                statusCode: 200,
                timestamp: new Date().toISOString(),
            }).pipe(delay(500));
        }
        return this.apiService.get(endpoint);
    }
    filterTransactions(request) {
        const encryptedBody = encryptBody(request, this.encryptionService);
        return this.apiService.post(ENDPOINTS.TRANSACTIONS.FILTER, encryptedBody);
    }
    createTransactions(body) {
        const endpoint = ENDPOINTS.TRANSACTIONS.CREATE;
        if (environment.useMocks) {
            return of({
                success: true,
                message: "Mock Data",
                data: TRANSACTIONS_MOCK,
                statusCode: 200,
                timestamp: new Date().toISOString(),
            }).pipe(delay(500));
        }
        const mappedBody = mapObjectKeys(body, CREATE_TRANSACTION_REQUEST_MAP);
        const encryptedBody = encryptBody(mappedBody, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody);
    }
    static { this.ɵfac = function TransactionRepository_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionRepository)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TransactionRepository, factory: TransactionRepository.ɵfac, providedIn: "root" }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionRepository, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }], null); })();
//# sourceMappingURL=transactions.repository.js.map