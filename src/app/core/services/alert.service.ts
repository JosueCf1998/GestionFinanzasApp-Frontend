import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { CustomAlertComponent } from '../../shared/components/custom-alert/custom-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private alertComponentRef: ComponentRef<CustomAlertComponent> | null = null;

  showAlert(
    title: string,
    message: string,
    confirmText: string = 'Aceptar',
    cancelText?: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      // Si ya hay un modal abierto, lo cerramos primero
      if (this.alertComponentRef) {
        this.closeAlert();
      }

      // Crear el componente
      this.alertComponentRef = createComponent(CustomAlertComponent, {
        environmentInjector: this.injector
      });

      // Configurar las propiedades del componente
      const instance = this.alertComponentRef.instance;
      instance.header = title;
      instance.message = message;
      instance.confirmText = confirmText;
      if (cancelText) {
        instance.cancelText = cancelText;
      }

      // Escuchar eventos
      instance.onConfirm.subscribe(() => {
        resolve(true);
        this.closeAlert();
      });

      instance.onCancel.subscribe(() => {
        resolve(false);
        this.closeAlert();
      });

      // Adjuntar a la aplicación
      this.appRef.attachView(this.alertComponentRef.hostView);
      const domElem = (this.alertComponentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }

  private closeAlert() {
    if (this.alertComponentRef) {
      this.appRef.detachView(this.alertComponentRef.hostView);
      this.alertComponentRef.destroy();
      this.alertComponentRef = null;
    }
  }
}
