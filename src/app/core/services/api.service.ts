import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza una solicitud GET a la API.
   */
  get<T>(endpoint: string): Observable<Result<T>> {
    return this.http.get<Result<T>>(`${this.baseUrl}/${endpoint}`).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud POST a la API.
   */
  post<T>(endpoint: string, body: any): Observable<Result<T>> {
    return this.http.post<Result<T>>(`${this.baseUrl}/${endpoint}`, body).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Maneja los errores de las solicitudes HTTP.
   */
  private handleError(error: any): Observable<Result<any>> {
    console.error('Error en la API:', error);
    return of({
      success: false,
      message: 'Error en la API',
      data: null,
      statusCode: error?.status,
      timestamp: new Date().toISOString()
    });
  }
}