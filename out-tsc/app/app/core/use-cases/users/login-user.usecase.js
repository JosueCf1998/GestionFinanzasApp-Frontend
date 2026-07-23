import { Injectable } from '@angular/core';
import { encryptBody } from '../../utils/encryption.util';
import { tap } from 'rxjs/operators';
import { KEY_MANAGEMENT } from '../../constants/key-management.constants';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
import * as i2 from "../../services/encryption.service";
import * as i3 from "../../services/localManagementService.service";
export class LoginUserUseCase {
    constructor(apiService, encryptionService, localManagementService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
        this.localManagementService = localManagementService;
    }
    execute(body) {
        const endpoint = 'users/login';
        const encryptedBody = encryptBody(body, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody).pipe(tap(result => {
            if (result.success && result.data) {
                this.saveUserData(result.data, body.email);
            }
        }));
    }
    saveUserData(userData, email) {
        console.log('Saving user data:', `Bearer ${userData.token}`);
        this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
        this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, email);
        this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, userData.nombre);
        this.localManagementService.setVariable(KEY_MANAGEMENT.IS_FIRST_TIME, userData.isFirstTime);
    }
    static { this.ɵfac = function LoginUserUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginUserUseCase)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService), i0.ɵɵinject(i3.LocalManagementService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoginUserUseCase, factory: LoginUserUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginUserUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }, { type: i3.LocalManagementService }], null); })();
//# sourceMappingURL=login-user.usecase.js.map