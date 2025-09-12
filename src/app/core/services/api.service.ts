import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Result, ErrorDetail } from "../models/result.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza una solicitud GET a la API con headers opcionales.
   */
  get<T>(endpoint: string, options?: { headers?: { [header: string]: string } }): Observable<Result<T>> {
    let httpOptions = {};
    if (options?.headers) {
      httpOptions = {
        headers: new HttpHeaders(options.headers)
      };
    }
    return this.http.get<Result<T>>(`${this.baseUrl}/${endpoint}`, httpOptions).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud POST a la API con headers opcionales.
   */
  post<T>(endpoint: string, body: any, options?: { headers?: { [header: string]: string } }): Observable<Result<T>> {
    let httpOptions = {};
    if (options?.headers) {
      httpOptions = {
        headers: new HttpHeaders(options.headers)
      };
    }
    return this.http.post<Result<T>>(`${this.baseUrl}/${endpoint}`, body, httpOptions).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Maneja los errores de las solicitudes HTTP.
   */
  private handleError(error: any): Observable<Result<any>> {
    const baseError: ErrorDetail = {
      code: error?.code || "API_ERROR",
      message: error?.message || "Error en la API",
      description:
        error?.error?.message || error?.statusText || "Error inesperado",
      details: error,
    };
    return of({
      success: false,
      message: baseError.message,
      data: null,
      error: baseError,
      statusCode: error?.status,
      timestamp: new Date().toISOString(),
    });
  }
}