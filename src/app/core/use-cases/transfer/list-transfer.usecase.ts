import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { mapObjectKeysReverse } from '../../utils/mapping.util';
import { ENDPOINTS } from '../../constants/endpoints';

export enum TransferType {
  initial = 'Inicial',
  adjustment = 'Ajuste',
  completed = 'Realizado'
}

export interface Transfer {
  id: number;
  originAccountId: number;
  originAccountName?: string;
  destinationAccountId: number;
  destinationAccountName?: string;
  type: TransferType;
  amount: number;
  date: string;
  comment: string;
}

export interface ListTransferResponse {
  items: Transfer[];
  Total?: number;
  mensaje?: string;
}

const TRANSFER_KEY_MAP = {
  id: 'id',
  originAccountId: 'cuenta_id_origen',
  destinationAccountId: 'cuenta_id_destino',
  amount: 'monto',
  date: 'fecha',
  comment: 'comentario',
  type: 'tipo_transferencia'
} as const;

@Injectable({
  providedIn: 'root',
})
export class ListTransferUseCase {

  constructor(private apiService: ApiService) {}

  listTransfer(): Observable<Result<ListTransferResponse>> {
    const endpoint = ENDPOINTS.TRANSFERS.LIST;
    return this.apiService.get<ListTransferResponse>(endpoint).pipe(
      map(result => ({
        ...result,
        data: { 
          items: (result.data?.items || []).map((t: any) => ({
            ...mapObjectKeysReverse(t, TRANSFER_KEY_MAP),
            amount: parseFloat(t.monto || '0'),
            type: Object.values(TransferType).includes(t.tipo_transferencia) ? t.tipo_transferencia : TransferType.completed
          } as Transfer)),
          Total: result.data?.Total,
          mensaje: result.data?.mensaje
        }
      } as Result<ListTransferResponse>))
    );
  }

}
