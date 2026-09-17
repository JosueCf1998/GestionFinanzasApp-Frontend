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
    this.clearSessionData();
  }

  /**
   * Limpia únicamente los datos de sesión activa (token, flags temporales),
   * conservando el email y nombre para permitir el modo de login recurrente.
   */
  private clearSessionData(): void {
    this.localManagementService.removeVariable(KEY_MANAGEMENT.TOKEN);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.ID);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.FIRST_LOGIN);
    this.localManagementService.removeVariable(KEY_MANAGEMENT.IS_FIRST_TIME);
  }

  /**
   * Limpia todo el almacenamiento local (incluyendo email y nombre recordados).
   * Se utiliza cuando el usuario presiona explícitamente "Usar otra cuenta".
   */
  clearAllData(): void {
    this.localManagementService.clear();
  }
}
