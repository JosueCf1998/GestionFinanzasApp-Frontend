import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { mapObjectKeysReverse } from '../../utils/mapping.util';
import * as i0 from "@angular/core";
import * as i1 from "../../services/api.service";
export var TransferType;
(function (TransferType) {
    TransferType["initial"] = "Inicial";
    TransferType["adjustment"] = "Ajuste";
    TransferType["completed"] = "Realizado";
})(TransferType || (TransferType = {}));
const TRANSFER_KEY_MAP = {
    id: 'id',
    originAccountId: 'cuenta_id_origen',
    destinationAccountId: 'cuenta_id_destino',
    amount: 'monto',
    date: 'fecha',
    comment: 'comentario',
    type: 'tipo_transferencia'
};
export class ListTransferUseCase {
    constructor(apiService) {
        this.apiService = apiService;
    }
    listTransfer() {
        const endpoint = 'transfers/list';
        return this.apiService.get(endpoint).pipe(map(result => ({
            ...result,
            data: {
                items: (result.data?.items || []).map((t) => ({
                    ...mapObjectKeysReverse(t, TRANSFER_KEY_MAP),
                    amount: parseFloat(t.monto || '0'),
                    type: Object.values(TransferType).includes(t.tipo_transferencia) ? t.tipo_transferencia : TransferType.completed
                }))
            }
        })));
    }
    static { this.ɵfac = function ListTransferUseCase_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListTransferUseCase)(i0.ɵɵinject(i1.ApiService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListTransferUseCase, factory: ListTransferUseCase.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListTransferUseCase, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.ApiService }], null); })();
//# sourceMappingURL=list-transfer.usecase.js.map