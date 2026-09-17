import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg, AlertController } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, CommonModule, FormsModule],
})
export class SplashPage implements OnInit {
  isLoginRecurrent = false;

  constructor(
    private readonly navService: NavigationService,
    private readonly localManagementService: LocalManagementService,
    private readonly alertController: AlertController
  ) {}

  async ngOnInit(): Promise<void> {
    const email = this.localManagementService.getNonEmptyVariable(KEY_MANAGEMENT.EMAIL);
    const name = this.localManagementService.getNonEmptyVariable(KEY_MANAGEMENT.NAME);
    this.isLoginRecurrent = Boolean(email && name);

    if (this.isLoginRecurrent) {
      setTimeout(() => {
        this.navService.replace('/login-recurrent');
      }, 2200);
      return;
    }

    const hasSeenPermissions = this.localManagementService.getVariable(KEY_MANAGEMENT.PERMISSIONS_SEEN) === 'true';
    if (hasSeenPermissions) {
      setTimeout(() => {
        this.navService.replace('/login');
      }, 1500);
      return;
    }

    // Primera vez tras instalar la app: mostrar diálogos nativos en el Splash
    setTimeout(async () => {
      await this.promptNativePermissions();
    }, 1000);
  }

  private async promptNativePermissions(): Promise<void> {
    const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent);
    const mode: 'ios' | 'md' = isIos ? 'ios' : 'md';

    // 1. Alerta nativa de Notificaciones (opcional)
    await new Promise<void>((resolve) => {
      const header = isIos
        ? '“Finvia” desea enviarle notificaciones'
        : '¿Permitir que Finvia te envíe notificaciones?';

      const message = isIos
        ? 'Las notificaciones pueden incluir sonidos, alertas y globos en la pantalla de inicio. Puede configurarlo desde Ajustes.'
        : 'Finvia te enviará alertas de transacciones en tiempo real, presupuestos y avisos de seguridad.';

      const confirmBtnText = isIos ? 'OK' : 'Permitir';

      this.alertController.create({
        header,
        message,
        mode,
        cssClass: 'native-permission-alert',
        backdropDismiss: false,
        buttons: [
          {
            text: 'No permitir',
            role: 'cancel',
            handler: () => resolve()
          },
          {
            text: confirmBtnText,
            role: 'confirm',
            handler: () => {
              if (typeof window !== 'undefined' && 'Notification' in window) {
                void Notification.requestPermission();
              }
              resolve();
            }
          }
        ]
      }).then((alert) => alert.present());
    });

    // 2. Alerta de Uso y Almacenamiento: Salir o Permitir directamente
    const header = isIos
      ? '¿Desea permitir que “Finvia” use esta aplicación?'
      : '¿Permitir que Finvia use esta aplicación?';

    const message = 'Finvia requiere acceso al almacenamiento del dispositivo para registrar sus transacciones, presupuestos y gestionar sus finanzas de forma segura.';

    const alert = await this.alertController.create({
      header,
      message,
      mode,
      cssClass: 'native-permission-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Salir',
          role: 'cancel',
          handler: async () => {
            await this.closeApp();
          }
        },
        {
          text: 'Permitir',
          role: 'confirm',
          handler: () => {
            this.localManagementService.setVariable(KEY_MANAGEMENT.PERMISSIONS_SEEN, 'true');
            this.navService.replace('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  private async closeApp(): Promise<void> {
    try {
      await App.exitApp();
    } catch {
      if (typeof window !== 'undefined') {
        window.close();
      }
    }
  }
}
