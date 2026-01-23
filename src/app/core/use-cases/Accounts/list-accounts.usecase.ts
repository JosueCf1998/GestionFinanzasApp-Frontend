import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { tap } from 'rxjs/operators';

export interface ListAccountsResponse {
  items: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListAccountsUseCase {

  constructor(
    private apiService: ApiService
  ) {}

  listAccounts(): Observable<Result<ListAccountsResponse>> {
    const endpoint = 'list-account';
    return this.apiService.get<ListAccountsResponse>(endpoint, {}).pipe(
      tap(result => {
        if (result.success && result.data) {
          // No es necesario guardar nada
        }
      })
    );
  }

}