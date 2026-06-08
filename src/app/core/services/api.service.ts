import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Result, ErrorDetail } from "../models/result.model";
import { LocalManagementService } from "./localManagementService.service";
import { KEY_MANAGEMENT } from "../constants/key-management.constants";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localManagement: LocalManagementService
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
   * Realiza una solicitud GET a la API con headers opcionales.
   */
  get<T>(endpoint: string, options?: { headers?: { [header: string]: string } }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
    return this.http.get<Result<T>>(`${this.baseUrl}/${endpoint}`, httpOptions).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Realiza una solicitud POST a la API con headers opcionales.
   */
  post<T>(endpoint: string, body: any, options?: { headers?: { [header: string]: string } }): Observable<Result<T>> {
    const httpOptions = {
      headers: this.buildHeaders(options?.headers)
    };
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