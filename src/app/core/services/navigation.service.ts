// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isNavigating = false;

  constructor(private readonly navCtrl: NavController) {}

  /**
   * Avanzar (derecha a izquierda)
   */
  async push(path: string, state?: any): Promise<void> {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    
    try {
      await this.navCtrl.navigateForward(path, {
        animated: true,
        animationDirection: 'forward',
        state
      });
    } finally {
      setTimeout(() => {
        this.isNavigating = false;
      }, 300);
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
    
    try {
      await this.navCtrl.back({
        animated: true,
        animationDirection: 'back'
      });
    } finally {
      setTimeout(() => {
        this.isNavigating = false;
      }, 300);
    }
  }

  /**
   * Reemplazar (sin historial) - para login
   */
  async replace(path: string, state?: any): Promise<void> {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    
    try {
      await this.navCtrl.navigateRoot(path, {
        animated: true,
        animationDirection: 'forward',
        state
      });
    } finally {
      setTimeout(() => {
        this.isNavigating = false;
      }, 300);
    }
  }
}
