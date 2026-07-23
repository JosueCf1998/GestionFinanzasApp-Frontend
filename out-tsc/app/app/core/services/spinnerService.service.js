// spinner.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
export class SpinnerService {
    constructor() {
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    show() {
        this.setLoading(true);
    }
    hide() {
        this.setLoading(false);
    }
    setLoading(value) {
        queueMicrotask(() => {
            if (this.loadingSubject.value !== value) {
                this.loadingSubject.next(value);
            }
        });
    }
    static { this.ɵfac = function SpinnerService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpinnerService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SpinnerService, factory: SpinnerService.ɵfac, providedIn: "root" }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpinnerService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], null, null); })();
//# sourceMappingURL=spinnerService.service.js.map