// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isNavigating = false;
  private navigationLockTimeout?: ReturnType<typeof setTimeout>;
  private readonly navigationLockMs = 150;

  constructor(private readonly navCtrl: NavController) {}

  /**
   * Avanzar (derecha a izquierda)
   */
  async push(path: string, state?: any): Promise<void> {
    if (this.isNavigating) return;

    this.isNavigating = true;
    this.clearNavigationLock();

    try {
      await this.navCtrl.navigateForward(path, {
        animated: true,
        animationDirection: 'forward',
        state
      });
    } finally {
      this.navigationLockTimeout = setTimeout(() => {
        this.isNavigating = false;
      }, this.navigationLockMs);
    }
  }

  /**
   * Alias de push
   */
  async forward(path: string, state?: any): Promise<void> {
    return this.push(path, state);
  }

  /**
   * Retroceder (izquierda a derecha)
   */
  async back(): Promise<void> {
    if (this.isNavigating) return;

    this.isNavigating = true;
    this.clearNavigationLock();

    try {
      await this.navCtrl.back({
        animated: true,
        animationDirection: 'back'
      });
    } finally {
      this.navigationLockTimeout = setTimeout(() => {
        this.isNavigating = false;
      }, this.navigationLockMs);
    }
  }

  /**
   * Retroceder múltiples pantallas
   */
  async backMultiple(steps: number): Promise<void> {
    if (this.isNavigating) return;

    this.isNavigating = true;
    this.clearNavigationLock();

    try {
      for (let i = 0; i < steps; i++) {
        await this.navCtrl.back({
          animated: i === steps - 1,
          animationDirection: 'back'
        });

        if (i < steps - 1) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    } finally {
      this.navigationLockTimeout = setTimeout(() => {
        this.isNavigating = false;
      }, this.navigationLockMs);
    }
  }

  /**
   * Reemplazar (sin historial) - para login
   */
  async replace(path: string, state?: any, animated: boolean = true): Promise<void> {
    if (this.isNavigating) return;

    this.isNavigating = true;
    this.clearNavigationLock();

    try {
      await this.navCtrl.navigateRoot(path, {
        animated: animated,
        animationDirection: animated ? 'back' : undefined,
        state
      });
    } finally {
      this.navigationLockTimeout = setTimeout(() => {
        this.isNavigating = false;
      }, animated ? this.navigationLockMs : 80);
    }
  }

  private clearNavigationLock(): void {
    if (this.navigationLockTimeout) {
      clearTimeout(this.navigationLockTimeout);
      this.navigationLockTimeout = undefined;
    }
  }

  /**
   * Navegación específica para logout (sin animación para evitar glitches)
   */
  async replaceToLogin(): Promise<void> {
    return this.replace('/login', undefined, false);
  }
}
