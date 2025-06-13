// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { NavController, AnimationBuilder, createAnimation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

type NavigationAnimation = 'slide' | 'fade' | 'flip' | 'zoom' | 'none' | 'back' | 'slide-right' | 'slide-left';

interface CustomNavigationOptions {
  animated?: boolean;
  animation?: AnimationBuilder;
  animationDirection?: 'forward' | 'back';
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  private getAnimationConfig(
    animation: NavigationAnimation,
    direction: 'forward' | 'back' = 'forward'
  ): CustomNavigationOptions {
    const config: CustomNavigationOptions = {
      animated: animation !== 'none',
      animationDirection: direction
    };

    if (animation === 'fade') {
      config.animation = (baseEl: any, opts: any) => {
        const enteringAnimation = createAnimation()
          .addElement(opts.enteringEl)
          .fromTo('opacity', 0, 1)
          .duration(300);

        const leavingAnimation = createAnimation()
          .addElement(opts.leavingEl)
          .fromTo('opacity', 1, 0)
          .duration(300);

        return createAnimation()
          .addAnimation(enteringAnimation)
          .addAnimation(leavingAnimation);
      };
    } else if (animation === 'flip') {
      config.animation = (baseEl: any, opts: any) => {
        return createAnimation()
          .addElement(opts.enteringEl)
          .duration(1000)
          .easing('ease-in')
          .fromTo('transform', 'rotateY(180deg)', 'rotateY(0deg)');
      };
    } else if (animation === 'zoom') {
      config.animation = (baseEl: any, opts: any) => {
        return createAnimation()
          .addElement(opts.enteringEl)
          .duration(400)
          .fromTo('transform', 'scale(0.5)', 'scale(1)')
          .fromTo('opacity', '0', '1');
      };
    }

    return config;
  }

  /**
   * Navegación hacia adelante con animación
   */
  push(path: string | string[], animation: NavigationAnimation = 'slide', state?: any): Promise<boolean> {
    const options = {
      ...this.getAnimationConfig(animation, 'forward'),
      state
    };

    if (Array.isArray(path)) {
      return this.navCtrl.navigateForward(path, options);
    }
    return this.navCtrl.navigateForward(path, options);
  }

  /**
   * Reemplaza la vista actual (sin guardar en historial)
   */
  replace(path: string, animation: NavigationAnimation = 'slide', state?: any): Promise<boolean> {
    return this.navCtrl.navigateRoot(path, {
      ...this.getAnimationConfig(animation),
      state
    });
  }

  /**
   * Navegación hacia atrás
   */
  async pop(animation: NavigationAnimation = 'back'): Promise<void> {
    const options = this.getAnimationConfig(animation, 'back');

    try {
      await this.navCtrl.back(options);
    } catch (error) {
      console.error('Error en navegación hacia atrás:', error);
      // Opcional: Navegar a fallback si no hay historial
      await this.navCtrl.navigateRoot('/fallback');
    }
  }

  /**
   * Navegación con parámetros como queryParams
   */
  pushWithQuery(basePath: string, params: Record<string, any>, animation: NavigationAnimation = 'slide'): Promise<boolean> {
    const queryParams = new URLSearchParams(params).toString();
    return this.push(`${basePath}?${queryParams}`, animation);
  }

  /**
   * Navegación hacia adelante con animación personalizada
   */
  forward(url: string, animation: 'slide-right' | 'slide-left' | 'slide' = 'slide-right') {
    // slide-left = avance (de izquierda a derecha), slide-right = retroceso (de derecha a izquierda)
    this.navCtrl.navigateForward(url, {
      animated: true,
      animationDirection: animation === 'slide-left' ? 'forward' : 'back'
    });
  }

  /**
   * Navegación hacia atrás con animación personalizada
   */
  back(url?: string, animation: 'back' | 'slide-left' | 'slide-right' = 'slide-left') {
    if (url) {
      this.router.navigateByUrl(url, { state: { animationDirection: animation === 'slide-right' ? 'back' : 'forward' } });
    } else {
      this.navCtrl.back({ animated: true, animationDirection: animation === 'slide-right' ? 'back' : 'forward' });
    }
  }
}
