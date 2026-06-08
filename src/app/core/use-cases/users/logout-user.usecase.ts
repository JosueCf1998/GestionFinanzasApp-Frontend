import { Injectable } from '@angular/core';
import { LocalManagementService } from '../../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../../constants/key-management.constants';

@Injectable({
  providedIn: 'root',
})
export class LogoutUserUseCase {

  constructor(
    private localManagementService: LocalManagementService
  ) {}

  logout(): void {
    this.clearAllData();
  }

  private clearAllData(): void {
    this.localManagementService.clear()
  }

}
