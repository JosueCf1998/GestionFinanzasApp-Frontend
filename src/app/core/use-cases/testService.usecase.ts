import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { UseCase } from '../protocols/usecase.protocol';
import { Post } from '../models/post.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class TestServiceUseCase implements UseCase<void, Observable<Result<Post[]>>> {
  constructor(private apiService: ApiService) {}

  /**
   * Ejecuta el caso de uso para obtener publicaciones.
   * @returns Un observable con el resultado de la operación.
   */
  executeGet(): Observable<Result<Post[]>> {
    const endpoint = 'listado-categoria';
    return this.apiService.get<Post[]>(endpoint);
  }

  /**
   * Ejecuta el caso de uso para enviar datos al servidor.
   * Si no se proporciona un cuerpo, se envía un objeto vacío.
   * @param body Cuerpo de la solicitud POST (opcional).
   * @returns Un observable con el resultado de la operación.
   */
  executePost(body?: any): Observable<Result<Post[]>> {
    const endpoint = 'listado-categoria';
    return this.apiService.post<Post[]>(endpoint, body || {}); // Envía un objeto vacío si no se proporciona un cuerpo
  }

}