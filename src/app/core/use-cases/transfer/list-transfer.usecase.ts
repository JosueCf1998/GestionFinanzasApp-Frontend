import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';

export interface Transfer {
  id: number;
  originAccountId: number;
  originAccountName: string;
  destinationAccountId: number;
  destinationAccountName: string;
  amount: number;
  date: string;
  comment: string;
}

export interface ListTransferResponse {
  items: Transfer[];
}

@Injectable({
  providedIn: 'root',
})
export class ListTransferUseCase {

  constructor(
    private apiService: ApiService
  ) {}

  listTransfer(): Observable<Result<ListTransferResponse>> {
    const endpoint = 'list-transfers';
    return this.apiService.get<ListTransferResponse>(endpoint);
  }

}