import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { CustomAlertComponent } from '../../shared/components/custom-alert/custom-alert.component';
import * as i0 from "@angular/core";
export class AlertService {
    constructor() {
        this.appRef = inject(ApplicationRef);
        this.injector = inject(EnvironmentInjector);
        this.alertComponentRef = null;
    }
    showAlert(title, message, confirmText = 'Aceptar', cancelText) {
        return new Promise((resolve) => {
            // Si ya hay un modal abierto, lo cerramos primero
            if (this.alertComponentRef) {
                this.closeAlert();
            }
            // Crear el componente
            this.alertComponentRef = createComponent(CustomAlertComponent, {
                environmentInjector: this.injector
            });
            // Configurar las propiedades del componente
            const instance = this.alertComponentRef.instance;
            instance.header = title;
            instance.message = message;
            instance.confirmText = confirmText;
            if (cancelText) {
                instance.cancelText = cancelText;
            }
            // Escuchar eventos
            instance.onConfirm.subscribe(() => {
                resolve(true);
                this.closeAlert();
            });
            instance.onCancel.subscribe(() => {
                resolve(false);
                this.closeAlert();
            });
            // Adjuntar a la aplicación
            this.appRef.attachView(this.alertComponentRef.hostView);
            const domElem = this.alertComponentRef.hostView.rootNodes[0];
            document.body.appendChild(domElem);
        });
    }
    closeAlert() {
        if (this.alertComponentRef) {
            this.appRef.detachView(this.alertComponentRef.hostView);
            this.alertComponentRef.destroy();
            this.alertComponentRef = null;
        }
    }
    static { this.ɵfac = function AlertService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AlertService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=alert.service.js.map