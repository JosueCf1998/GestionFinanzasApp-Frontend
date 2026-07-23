import { Injectable } from '@angular/core';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
import * as i2 from "../../services/encryption.service";
// Mapeo de propiedades
const REQUEST_KEY_MAP = {
    name: 'nombre',
    lastName: 'apellidos',
    email: 'email',
    password: 'password'
};
export class RegisterUserUseCase {
    constructor(apiService, encryptionService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
    }
    createUser(body) {
        const endpoint = 'users/register';
        const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
        const encryptedBody = encryptBody(mappedBody, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody);
    }
    static { this.ɵfac = function RegisterUserUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterUserUseCase)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RegisterUserUseCase, factory: RegisterUserUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterUserUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }], null); })();
//# sourceMappingURL=register-user.usecase.js.map