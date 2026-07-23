import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalManagementService {
    /**
     * Guarda una variable simple (string, number, boolean) en localStorage.
     * Evita guardar valores undefined o null.
     */
    setVariable(key, value) {
        if (value === undefined || value === null) {
            console.error(`No se puede guardar "${key}": valor indefinido o nulo`);
            return false;
        }
        try {
            localStorage.setItem(key, value.toString());
            return true;
        }
        catch (error) {
            console.error(`Error guardando "${key}" en localStorage:`, error);
            return false;
        }
    }
    /**
     * Obtiene una variable simple de localStorage.
     */
    getVariable(key) {
        try {
            return localStorage.getItem(key);
        }
        catch (error) {
            console.error(`Error obteniendo "${key}" de localStorage:`, error);
            return null;
        }
    }
    /**
     * Elimina una variable de localStorage.
     */
    removeVariable(key) {
        localStorage.removeItem(key);
    }
    /**
     * Limpia todo el localStorage.
     */
    clear() {
        localStorage.clear();
    }
    static { this.ɵfac = function LocalManagementService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LocalManagementService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LocalManagementService, factory: LocalManagementService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LocalManagementService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=localManagementService.service.js.map