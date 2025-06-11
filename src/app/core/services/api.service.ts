import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Result } from '../models/result.model';
import { environment } from '../../../environments/environment'; // Importa el archivo de ambiente


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; // URL base desde el archivo de ambiente

  constructor(private http: HttpClient) {}

  /**
   * Realiza una solicitud GET a la API.
   * @param endpoint Endpoint de la API (relativo a la URL base).
   * @returns Un observable con el resultado de la operación.
   */
  get<T>(endpoint: string): Observable<Result<T>> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(
      map((data) => ({
        statusCode: 200,
        success: true,
        message: 'Operación exitosa',
        data,
      })),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud POST a la API.
   * @param endpoint Endpoint de la API (relativo a la URL base).
   * @param body Cuerpo de la solicitud.
   * @returns Un observable con el resultado de la operación.
   */
  post<T>(endpoint: string, body: any): Observable<Result<T>> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body).pipe(
      map((data) => ({
        statusCode: 200,
        success: true,
        message: 'Operación exitosa',
        data,
      })),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Maneja los errores de las solicitudes HTTP.
   * @param error Error devuelto por la API.
   * @returns Un observable con el resultado del error.
   */
  private handleError(error: any): Observable<Result<any>> {
    console.error('Error en la API:', error);
    return of({
      statusCode: error.status || 500,
      success: false,
      message: 'Error en la operación',
      error: {
        code: 'SERVER_ERROR',
        description: error.message || 'Error desconocido',
        details: error,
      },
    });
  }
}