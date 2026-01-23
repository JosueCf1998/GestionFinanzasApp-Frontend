import { Injectable } from '@angular/core';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

@Injectable({
  providedIn: 'root',
})
export class LogoutServiceUseCase {

  constructor(
    private localManagementService: LocalManagementService
  ) {}

  logout(): void {
    this.clearAllData();
  }

  private clearAllData(): void {
    this.localManagementService.removeVariable(KEY_MANAGEMENT.TOKEN);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.NAME);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.EMAIL);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.ID);
  }

  hasActiveSession(): boolean {
    const token = this.localManagementService.getVariable(KEY_MANAGEMENT.TOKEN);
    return !!token;
  }
}
