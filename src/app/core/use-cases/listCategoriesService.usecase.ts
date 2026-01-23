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
    return this.apiService.get<ListCategoriesResponse>(endpoint).pipe(
      tap(result => {
        if (result.success && result.data?.items) {
        }
      })
    );
  }

}