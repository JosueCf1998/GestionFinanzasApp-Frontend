// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
export class NavigationService {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
        this.isNavigating = false;
    }
    /**
     * Avanzar (derecha a izquierda)
     */
    async push(path, state) {
        if (this.isNavigating)
            return;
        this.isNavigating = true;
        try {
            await this.navCtrl.navigateForward(path, {
                animated: true,
                animationDirection: 'forward',
                state
            });
        }
        finally {
            setTimeout(() => {
                this.isNavigating = false;
            }, 300);
        }
    }
    /**
     * Alias de push
     */
    async forward(path, state) {
        return this.push(path, state);
    }
    /**
     * Retroceder (izquierda a derecha)
     */
    async back() {
        if (this.isNavigating)
            return;
        this.isNavigating = true;
        try {
            await this.navCtrl.back({
                animated: true,
                animationDirection: 'back'
            });
        }
        finally {
            setTimeout(() => {
                this.isNavigating = false;
            }, 300);
        }
    }
    /**
     * Retroceder múltiples pantallas
     */
    async backMultiple(steps) {
        if (this.isNavigating)
            return;
        this.isNavigating = true;
        try {
            for (let i = 0; i < steps; i++) {
                await this.navCtrl.back({
                    animated: i === steps - 1, // Solo animar la última navegación
                    animationDirection: 'back'
                });
                // Pequeño delay entre navegaciones para asegurar que se procesen
                if (i < steps - 1) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        }
        finally {
            setTimeout(() => {
                this.isNavigating = false;
            }, 300);
        }
    }
    /**
     * Reemplazar (sin historial) - para login
     */
    async replace(path, state, animated = true) {
        if (this.isNavigating)
            return;
        this.isNavigating = true;
        try {
            await this.navCtrl.navigateRoot(path, {
                animated: animated,
                animationDirection: animated ? 'back' : undefined,
                state
            });
        }
        finally {
            setTimeout(() => {
                this.isNavigating = false;
            }, animated ? 300 : 100);
        }
    }
    /**
     * Navegación específica para logout (sin animación para evitar glitches)
     */
    async replaceToLogin() {
        return this.replace('/login', undefined, false);
    }
    static { this.ɵfac = function NavigationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavigationService)(i0.ɵɵinject(i1.NavController)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NavigationService, factory: NavigationService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.NavController }], null); })();
//# sourceMappingURL=navigation.service.js.map