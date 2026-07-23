import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/localManagementService.service";
export class LogoutUserUseCase {
    constructor(localManagementService) {
        this.localManagementService = localManagementService;
    }
    logout() {
        this.clearAllData();
    }
    clearAllData() {
        this.localManagementService.clear();
    }
    static { this.ɵfac = function LogoutUserUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LogoutUserUseCase)(i0.ɵɵinject(i1.LocalManagementService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LogoutUserUseCase, factory: LogoutUserUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogoutUserUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.LocalManagementService }], null); })();
//# sourceMappingURL=logout-user.usecase.js.map