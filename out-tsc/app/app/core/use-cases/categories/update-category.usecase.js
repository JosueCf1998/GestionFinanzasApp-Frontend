import { Injectable } from '@angular/core';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
import * as i2 from "../../services/encryption.service";
// Mapeo de propiedades
const REQUEST_KEY_MAP = {
    id: 'categoria_id',
    name: 'nombre',
    type: 'tipo',
    icon: 'icono',
    color: 'color'
};
export class UpdateCategoryUseCase {
    constructor(apiService, encryptionService) {
        this.apiService = apiService;
        this.encryptionService = encryptionService;
    }
    updateCategory(body) {
        const endpoint = 'categories/update';
        const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
        const encryptedBody = encryptBody(mappedBody, this.encryptionService);
        return this.apiService.post(endpoint, encryptedBody);
    }
    static { this.ɵfac = function UpdateCategoryUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UpdateCategoryUseCase)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.EncryptionService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UpdateCategoryUseCase, factory: UpdateCategoryUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UpdateCategoryUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }, { type: i2.EncryptionService }], null); })();
//# sourceMappingURL=update-category.usecase.js.map