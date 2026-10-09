import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalManagementService } from '../services/localManagementService.service';
import { NavigationService } from '../services/navigation.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

/**
 * Guard funcional para proteger rutas autenticadas.
 * Verifica si existe un token de usuario activo en el almacenamiento local.
 * Si no existe, redirige de forma segura a la pantalla de login.
 */
export const authGuard: CanActivateFn = () => {
  const localManagement = inject(LocalManagementService);
  const navService = inject(NavigationService);
  const token = localManagement.getNonEmptyVariable(KEY_MANAGEMENT.TOKEN);

  if (token) {
    return true;
  }

  void navService.replaceToLogin();
  return false;
};

