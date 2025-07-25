import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalManagementService {

  /**
   * Guarda una variable simple (string, number, boolean) en localStorage.
   * Evita guardar valores undefined o null.
   */
  setVariable(key: string, value: string | number | boolean): boolean {
    if (value === undefined || value === null) {
      console.error(`No se puede guardar "${key}": valor indefinido o nulo`);
      return false;
    }
    try {
      localStorage.setItem(key, value.toString());
      return true;
    } catch (error) {
      console.error(`Error guardando "${key}" en localStorage:`, error);
      return false;
    }
  }

  /**
   * Obtiene una variable simple de localStorage.
   */
  getVariable(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error obteniendo "${key}" de localStorage:`, error);
      return null;
    }
  }

  /**
   * Elimina una variable de localStorage.
   */
  removeVariable(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el localStorage.
   */
  clear(): void {
    localStorage.clear();
  }
}