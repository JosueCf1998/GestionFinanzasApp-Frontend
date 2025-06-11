import { InjectionToken } from '@angular/core';
import { ApiProtocol } from './api.protocol';

/**
 * Token de inyección para ApiProtocol.
 */
export const API_PROTOCOL = new InjectionToken<ApiProtocol>('API_PROTOCOL');