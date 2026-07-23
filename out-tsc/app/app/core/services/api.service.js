import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { KEY_MANAGEMENT } from "../constants/key-management.constants";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./localManagementService.service";
export class ApiService {
    constructor(http, localManagement) {
        this.http = http;
        this.localManagement = localManagement;
        this.baseUrl = environment.apiUrl;
    }
    /**
     * Construye los headers incluyendo el token de autorización si existe.
     */
    buildHeaders(customHeaders) {
        let headers = {
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
    get(endpoint, options) {
        const httpOptions = {
            headers: this.buildHeaders(options?.headers)
        };
        return this.http.get(`${this.baseUrl}/${endpoint}`, httpOptions).pipe(map((response) => response), catchError((error) => this.handleError(error)));
    }
    /**
     * Realiza una solicitud POST a la API con headers opcionales.
     */
    post(endpoint, body, options) {
        const httpOptions = {
            headers: this.buildHeaders(options?.headers)
        };
        return this.http.post(`${this.baseUrl}/${endpoint}`, body, httpOptions).pipe(map((response) => response), catchError((error) => this.handleError(error)));
    }
    /**
     * Maneja los errores de las solicitudes HTTP.
     */
    handleError(error) {
        const baseError = {
            code: error?.code || "API_ERROR",
            message: error?.message || "Error en la API",
            description: error?.error?.message || error?.statusText || "Error inesperado",
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
    static { this.ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.LocalManagementService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: "root" }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2.LocalManagementService }], null); })();
//# sourceMappingURL=api.service.js.map