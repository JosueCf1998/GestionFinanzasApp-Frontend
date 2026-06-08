import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { Categoria } from 'src/app/shared/models/categoria.model';

export interface ListTransactionsResponse {
  items: TransactionResponse[]
}

export interface TransactionResponse {
  id: number;
  color: string;
  icono: string;
  usuario_id: number | null;
  nombre: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListTransactionsUseCase {

  public gastos: Categoria[] = [];
  public ingresos: Categoria[] = [];

  constructor(
    private apiService: ApiService
  ) {}

  execute(): Observable<Result<ListTransactionsResponse>> {
    const endpoint = 'transactions/list';
    return this.apiService.get<ListTransactionsResponse>(endpoint);
  }

}