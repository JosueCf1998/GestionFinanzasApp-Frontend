import { Injectable } from '@angular/core';
import { encryptBody } from '../../utils/encryption.util';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
import * as i2 from "../../services/encryption.service";
import * as i3 from "../../services/localManagementService.service";
export class ForgotPasswordUserUseCase {
    constructor(apiService, encryptionService, localManagementService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
        this.localManagementService = localManagementService;
    }
    forgotPassword(body) {
        const endpoint = 'users/forgot-password';
        const encryptedBody = encryptBody(body, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody);
    }
    static { this.ɵfac = function ForgotPasswordUserUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotPasswordUserUseCase)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService), i0.ɵɵinject(i3.LocalManagementService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ForgotPasswordUserUseCase, factory: ForgotPasswordUserUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPasswordUserUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }, { type: i3.LocalManagementService }], null); })();
//# sourceMappingURL=forgot-password-user.usecase.js.map