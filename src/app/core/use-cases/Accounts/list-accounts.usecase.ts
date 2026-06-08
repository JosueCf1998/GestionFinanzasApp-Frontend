import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
export interface Accounts {
  id: number;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

export interface ListAccountsResponse {
  items: Accounts[];
}

@Injectable({
  providedIn: 'root',
})
export class ListAccountsUseCase {

  constructor(
    private apiService: ApiService
  ) {}

  listAccounts(): Observable<Result<ListAccountsResponse>> {
    const endpoint = 'accounts/list';
    return this.apiService.get<ListAccountsResponse>(endpoint);
  }

}