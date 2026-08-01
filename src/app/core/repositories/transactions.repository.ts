import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ApiService } from "../services/api.service";
import { Result } from "../models/result.model";
import {
  FilterTransactionsRequest,
  FilterTransactionsResponse,
  ListTransactionsResponse
} from "../models/transactions/list-transactions.model";
import { TRANSACTIONS_MOCK } from "../mocks/transactions.mock";
import { ENDPOINTS } from "../constants/endpoints";
import { EncryptionService } from "../services/encryption.service";
import { encryptBody } from "../utils/encryption.util";
import { CreateTransactionsRequest, CreateTransactionsResponse, UpdateTransactionRequest } from "../models/transactions/create-transaction.mode";
import { CREATE_TRANSACTION_REQUEST_MAP, UPDATE_TRANSACTION_REQUEST_MAP } from "../constants/transactions/create-transaction.constants";
import { mapObjectKeys } from "../utils/mapping.util";

@Injectable({
  providedIn: "root",
})
export class TransactionRepository {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  listTransactions(): Observable<Result<ListTransactionsResponse>> {
    const endpoint = ENDPOINTS.TRANSACTIONS.LIST;
    if (environment.useMocks) {
      return of({
        success: true,
        message: "Mock Data",
        data: TRANSACTIONS_MOCK,
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as Result<ListTransactionsResponse>).pipe(delay(500));
    }
    return this.apiService.get<ListTransactionsResponse>(endpoint);
  }

  filterTransactions(
    request: FilterTransactionsRequest
  ): Observable<Result<FilterTransactionsResponse>> {
    const encryptedBody = encryptBody(request, this.encryptionService);
    return this.apiService.post<FilterTransactionsResponse>(
      ENDPOINTS.TRANSACTIONS.FILTER,
      encryptedBody
    );
  }

  createTransactions(body: CreateTransactionsRequest): Observable<Result<CreateTransactionsResponse>> {
    const endpoint = ENDPOINTS.TRANSACTIONS.CREATE;
    if (environment.useMocks) {
      return of({
        success: true,
        message: "Mock Data",
        data: TRANSACTIONS_MOCK,
        statusCode: 200,
        timestamp: new Date().toISOString(),
      } as Result<CreateTransactionsResponse>).pipe(delay(500));
    }
    const mappedBody = mapObjectKeys(body, CREATE_TRANSACTION_REQUEST_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<CreateTransactionsResponse>(endpoint, encryptedBody);
  }

  updateTransaction(body: UpdateTransactionRequest): Observable<Result<CreateTransactionsResponse>> {
    const mappedBody = mapObjectKeys(body, UPDATE_TRANSACTION_REQUEST_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<CreateTransactionsResponse>(ENDPOINTS.TRANSACTIONS.UPDATE, encryptedBody);
  }

  deleteTransaction(id: number): Observable<Result<{ mensaje?: string; info?: { id: number } }>> {
    const encryptedBody = encryptBody({ transac_id: id }, this.encryptionService);
    return this.apiService.post<{ mensaje?: string; info?: { id: number } }>(
      ENDPOINTS.TRANSACTIONS.DELETE,
      encryptedBody
    );
  }

}
