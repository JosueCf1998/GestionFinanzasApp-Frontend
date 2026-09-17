import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg, AlertController } from '@ionic/angular/standalone';
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

    // 1. Alerta nativa de Notificaciones
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

    // 2. Alerta nativa de Permiso para usar la app
    await new Promise<void>((resolve) => {
      const header = isIos
        ? '¿Desea permitir que “Finvia” use esta aplicación?'
        : '¿Permitir que Finvia acceda al almacenamiento de la app?';

      const message = isIos
        ? 'Finvia requiere acceso al almacenamiento del dispositivo para registrar sus transacciones, presupuestos y gestionar sus finanzas de forma segura.'
        : 'Finvia necesita este permiso para guardar y procesar tus cuentas, transacciones y presupuestos en este dispositivo.';

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
            handler: () => resolve()
          }
        ]
      }).then((alert) => alert.present());
    });

    this.localManagementService.setVariable(KEY_MANAGEMENT.PERMISSIONS_SEEN, 'true');
    this.navService.replace('/login');
  }
}
