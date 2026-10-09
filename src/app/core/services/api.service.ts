import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, timeout } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Result } from "../models/result.model";
import { LocalManagementService } from "./localManagementService.service";
import { NavigationService } from "./navigation.service";
import { KEY_MANAGEMENT } from "../constants/key-management.constants";
import { AppErrorMapper } from "../utils/error-mapper.util";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private readonly defaultTimeoutMs = 15000;

  constructor(
    private http: HttpClient,
    private localManagement: LocalManagementService,
    private navigationService: NavigationService
  ) {}

  /**
   * Construye los headers incluyendo el token de autorización si existe.
   */
  private buildHeaders(customHeaders?: { [header: string]: string }): HttpHeaders {
    let headers: { [header: string]: string } = {
      'Content-Type': 'application/json',
      ...customHeaders
    };
    const token = this.localManagement.getVariable(KEY_MANAGEMENT.TOKEN);
    if (token) {
      headers['Authorization'] = token;
    }
    return new HttpHeaders(headers);
  }

  /**
   * Realiza una solicitud GET a la API con headers y timeout opcionales.
   */
  get<T>(endpoint: string, options?: { headers?: { [header: string]: string }; timeoutMs?: number }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
    return this.http.get<Result<T>>(`${this.baseUrl}/${endpoint}`, httpOptions).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeoutMs),
      map((response) => this.normalizeResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud POST a la API con headers y timeout opcionales.
   */
  post<T>(endpoint: string, body: any, options?: { headers?: { [header: string]: string }; timeoutMs?: number }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
    return this.http.post<Result<T>>(`${this.baseUrl}/${endpoint}`, body, httpOptions).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeoutMs),
      map((response) => this.normalizeResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud PUT a la API con headers y timeout opcionales.
   */
  put<T>(endpoint: string, body: any, options?: { headers?: { [header: string]: string }; timeoutMs?: number }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
    return this.http.put<Result<T>>(`${this.baseUrl}/${endpoint}`, body, httpOptions).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeoutMs),
      map((response) => this.normalizeResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud DELETE a la API con headers y timeout opcionales.
   */
  delete<T>(endpoint: string, options?: { headers?: { [header: string]: string }; timeoutMs?: number }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
    return this.http.delete<Result<T>>(`${this.baseUrl}/${endpoint}`, httpOptions).pipe(
      timeout(options?.timeoutMs ?? this.defaultTimeoutMs),
      map((response) => this.normalizeResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Normaliza cualquier respuesta exitosa a nivel HTTP (200 OK) para asegurar que,
   * si el servicio retorna success: false o un error no mapeado en el payload,
   * pase obligatoriamente por los filtros estandarizados (Timeout, ConectionError, GenericError).
   */
  private normalizeResponse<T>(response: Result<T>): Result<T> {
    if (!response || typeof response !== 'object') {
      const genericError = AppErrorMapper.map('Respuesta no válida del servicio');
      return {
        success: false,
        message: genericError.message,
        data: null,
        error: genericError,
        statusCode: 500,
        timestamp: new Date().toISOString(),
      };
    }

    if (!response.success) {
      const mappedError = AppErrorMapper.map(response.error ?? response);
      return {
        ...response,
        success: false,
        message: response.message || mappedError.message,
        data: response.data ?? null,
        error: mappedError,
        statusCode: response.statusCode ?? (mappedError.code === 'Timeout' ? 408 : mappedError.code === 'ConectionError' ? 0 : 500),
        timestamp: response.timestamp || new Date().toISOString(),
      };
    }

    return response;
  }

  /**
   * Maneja y normaliza los errores a nivel de transporte HTTP o excepciones de red.
   * - Si el token expiró (HTTP 401), limpia la sesión y redirige de forma segura al login.
   * - Estandariza el error en las 3 categorías requeridas:
   *   1. Timeout
   *   2. ConectionError
   *   3. GenericError
   */
  private handleError(error: any): Observable<Result<any>> {
    if (error?.status === 401) {
      this.localManagement.removeVariable(KEY_MANAGEMENT.TOKEN);
      void this.navigationService.replaceToLogin();
    }

    const appError = AppErrorMapper.map(error);

    return of({
      success: false,
      message: appError.message,
      data: null,
      error: appError,
      statusCode: error?.status ?? (appError.code === 'Timeout' ? 408 : appError.code === 'ConectionError' ? 0 : 500),
      timestamp: new Date().toISOString(),
    });
  }
}
