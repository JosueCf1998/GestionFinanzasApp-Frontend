import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost/GestionFinanzasApp-Backend/listado-categoria';
  //private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de publicaciones desde la API.
   * @returns Un observable con el resultado de la operación.
   */
  getPosts(): Observable<Result<Post[]>> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      map((data) => ({
        statusCode: 200,
        success: true,
        message: 'Publicaciones obtenidas con éxito',
        data,
      })),
      catchError((error) => {
        console.error('Error en la API:', error);
        return of({
          statusCode: error.status || 500,
          success: false,
          message: 'Error al obtener las publicaciones',
          error: {
            code: 'SERVER_ERROR',
            description: error.message || 'Error desconocido',
            details: error,
          },
        });
      })
    );
  }


}