import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';
import { Categoria } from 'src/app/shared/models/categoria.model';

export interface ListCategoriesResponse {
  items: CategoryResponse[]
}

export interface CategoryResponse {
  color: string,
  icono: string,
  usuario_id: number | null,
  nombre: string,
  tipo: string
}

@Injectable({
  providedIn: 'root',
})
export class ListCategoriesServiceUseCase {

  public gastos: Categoria[] = [];
  public ingresos: Categoria[] = [];

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  listCategories(): Observable<Result<ListCategoriesResponse>> {
    const endpoint = 'listado-categoria';
    // const token = this.localManagementService.getVariable(KEY_MANAGEMENT.TOKEN);
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJfaWQiOjQ1LCJlbWFpbCI6Impvc3VlMTIzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NTY4MDA0MjcsImV4cCI6MTg1NjgwMDQyN30.FlUmrkjARJeZ25JJsQtesBwX32QWyt1cds_tIg4By_8"
    const options = {
      headers: {
        Authorization: token
      }
    };
    return this.apiService.get<ListCategoriesResponse>(endpoint, options).pipe(
      tap(result => {
        if (result.success && result.data?.items) {
        }
      })
    );
  }

}