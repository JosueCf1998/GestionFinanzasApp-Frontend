import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { UseCase } from '../protocols/usecase.protocol';
import { Post } from '../models/post.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class GetHomeUseCase implements UseCase<void, Observable<Result<Post[]>>> {
  constructor(private apiService: ApiService) {}

  /**
   * Ejecuta el caso de uso para obtener publicaciones.
   * @returns Un observable con el resultado de la operación.
   */
  execute(): Observable<Result<Post[]>> {
    return this.apiService.getPosts();
  }



}