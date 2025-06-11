import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Result } from '../models/result.model';

/**
 * Protocolo para servicios de API.
 */
export interface ApiProtocol {
  /**
   * Obtiene una lista de publicaciones.
   * @returns Un observable con el resultado de la operación.
   */
  getPosts(): Observable<Result<Post[]>>;
}