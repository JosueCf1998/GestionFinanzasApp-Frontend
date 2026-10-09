import { ErrorDetail } from './result.model';

export type AppErrorType = 'Timeout' | 'ConectionError' | 'GenericError';

export const APP_ERROR_CODES = {
  TIMEOUT: 'Timeout' as const,
  CONNECTION_ERROR: 'ConectionError' as const,
  GENERIC_ERROR: 'GenericError' as const,
};

export interface AppErrorDetail extends ErrorDetail {
  code: AppErrorType;
  type: AppErrorType;
  title: string;
}

