import { Injectable } from '@angular/core';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
import * as i2 from "../../services/encryption.service";
// Mapeo de propiedades
const REQUEST_KEY_MAP = {
    name: 'nombre',
    amount: 'saldo',
    icon: 'icon',
    color: 'color'
};
export class CreateAccountUseCase {
    constructor(apiService, encryptionService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
    }
    execute(body) {
        const endpoint = 'accounts/register';
        const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
        const encryptedBody = encryptBody(mappedBody, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody);
    }
    static { this.ɵfac = function CreateAccountUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateAccountUseCase)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CreateAccountUseCase, factory: CreateAccountUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateAccountUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }], null); })();
//# sourceMappingURL=create-account.usecase.js.map