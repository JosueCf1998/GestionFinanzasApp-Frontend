import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonInput } from '@ionic/angular/standalone';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { ForgotPasswordUserUseCase } from 'src/app/core/use-cases/users/forgot-password-user.usecase';
import { LogoutUserUseCase } from 'src/app/core/use-cases/users/logout-user.usecase';
import { ProfileUserResponse, ProfileUserUseCase } from 'src/app/core/use-cases/users/profile-user.usecase';
import 'src/app/core/utils/observable-extensions';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { LegalDocumentViewerComponent } from './legal-document-viewer/legal-document-viewer.component';
import { ProfileFieldEditModalComponent } from './profile-field-edit-modal/profile-field-edit-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonInput,
    ItemIconComponent,
    BaseModalComponent,
    ProfileFieldEditModalComponent,
    ChangePasswordModalComponent,
    LegalDocumentViewerComponent,
    CustomAlertComponent
  ]
})
export class ProfilePage implements OnInit {
  userId: number | null = null;
  nombre = '';
  apellidos = '';
  email = '';
  showFullEmail = false;

  // Modales
  isEditNameModalOpen = false;
  isChangePasswordModalOpen = false;
  isOtpModalOpen = false;
  isLegalViewerOpen = false;
  legalDocType: 'privacy' | 'terms' = 'privacy';

  // OTP para cambio de contraseña
  otpCode = '';
  pendingNewPassword = '';
  otpLoading = false;

  // Alertas
  showDeleteConfirmAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage = '';
  modalLoading = false;

  constructor(
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly localManagementService: LocalManagementService,
    private readonly navService: NavigationService,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadCachedUserData();
    this.fetchProfileData();
  }

  ionViewWillEnter(): void {
    this.loadCachedUserData();
  }

  get fullName(): string {
    const full = `${this.nombre} ${this.apellidos}`.trim();
    return full || this.nombre || 'Usuario';
  }

  get initials(): string {
    const letter = (this.nombre || 'U').trim().charAt(0).toUpperCase();
    return letter || 'U';
  }

  get displayedEmail(): string {
    if (this.showFullEmail) {
      return this.email || 'usuario@finvia.app';
    }
    return this.maskEmail(this.email);
  }

  private loadCachedUserData(): void {
    const cachedId = this.localManagementService.getVariable(KEY_MANAGEMENT.ID);
    if (cachedId) {
      this.userId = Number(cachedId);
    }
    const cachedName = this.localManagementService.getNonEmptyVariable(KEY_MANAGEMENT.NAME) || '';
    const cachedEmail = this.localManagementService.getNonEmptyVariable(KEY_MANAGEMENT.EMAIL) || '';
    if (cachedName && !this.nombre) {
      this.nombre = cachedName;
    }
    if (cachedEmail && !this.email) {
      this.email = cachedEmail;
    }
  }

  fetchProfileData(): void {
    this.profileUserUseCase.getProfile().service({
      success: (data) => {
        if (data?.user) {
          this.applyUserData(data.user);
        }
      },
      failure: () => {
        // Mantiene los datos cacheados
      }
    });
  }

  private applyUserData(user: ProfileUserResponse): void {
    this.userId = user.id;
    if (user.id) {
      this.localManagementService.setVariable(KEY_MANAGEMENT.ID, user.id);
    }
    this.nombre = user.nombre || this.nombre;
    this.apellidos = user.apellidos || '';
    this.email = user.email || this.email;

    const resolvedName = this.fullName.trim();
    if (resolvedName) {
      this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, resolvedName);
    }
    if (this.email) {
      this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, this.email);
    }
  }

  toggleEmailMask(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showFullEmail = !this.showFullEmail;
  }

  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email || 'usuario@finvia.app';
    const [user, domain] = email.split('@');
    if (user.length <= 2) {
      return `${user}***@${domain}`;
    }
    return `${user.slice(0, 2)}***@${domain}`;
  }

  // --- Modal Edición de Nombre ---
  openEditNameModal(): void {
    this.isEditNameModalOpen = true;
  }

  closeEditNameModal(): void {
    this.isEditNameModalOpen = false;
  }

  onSaveName(newName: string): void {
    const cleanName = newName.trim();
    if (!cleanName) return;

    // Divide nombre y apellidos si el usuario ingresó más de una palabra
    const parts = cleanName.split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    const payload = lastName ? { nombre: firstName, apellidos: lastName } : { nombre: firstName, apellidos: '' };

    if (this.userId) {
      this.modalLoading = true;
      this.profileUserUseCase.updateProfile(this.userId, payload).service({
        success: () => {
          this.modalLoading = false;
          this.nombre = firstName;
          this.apellidos = lastName;
          this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, cleanName);
          this.closeEditNameModal();
          this.showSuccessNotification('Nombre actualizado con éxito.');
        },
        failure: (err) => {
          this.modalLoading = false;
          this.showErrorNotification(err?.message || 'Error al actualizar el nombre.');
        }
      });
    } else {
      this.nombre = firstName;
      this.apellidos = lastName;
      this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, cleanName);
      this.closeEditNameModal();
      this.showSuccessNotification('Nombre guardado localmente.');
    }
  }

  // --- Modal Cambio de Contraseña ---
  openChangePasswordModal(): void {
    this.isChangePasswordModalOpen = true;
  }

  closeChangePasswordModal(): void {
    this.isChangePasswordModalOpen = false;
  }

  onSavePassword(payload: { newPassword: string }): void {
    if (!this.email) {
      this.closeChangePasswordModal();
      this.showErrorNotification('No se encontró el correo del usuario.');
      return;
    }

    this.pendingNewPassword = payload.newPassword;
    this.modalLoading = true;

    // Paso 1: Enviar solicitud de código OTP al correo del usuario autenticado
    this.forgotPasswordUseCase.passwordResetRequest({ email: this.email }).service({
      success: () => {
        this.modalLoading = false;
        this.closeChangePasswordModal();
        this.otpCode = '';
        this.isOtpModalOpen = true;
      },
      failure: (err) => {
        this.modalLoading = false;
        this.showErrorNotification(err?.message || 'Error al enviar código OTP a tu correo.');
      }
    });
  }

  // --- Modal OTP para Contraseña ---
  closeOtpModal(): void {
    if (this.otpLoading) return;
    this.isOtpModalOpen = false;
    this.otpCode = '';
    this.pendingNewPassword = '';
  }

  confirmOtpPasswordReset(): void {
    const otp = this.otpCode.trim();
    if (!otp || otp.length !== 6) {
      this.showErrorNotification('Por favor, ingresa el código OTP de 6 dígitos.');
      return;
    }

    this.otpLoading = true;
    this.forgotPasswordUseCase.passwordResetConfirm({
      email: this.email,
      otp_code: otp,
      new_password: this.pendingNewPassword
    }).service({
      success: () => {
        this.otpLoading = false;
        this.isOtpModalOpen = false;
        this.otpCode = '';
        this.pendingNewPassword = '';
        this.showSuccessNotification('¡Contraseña actualizada correctamente!');
      },
      failure: (err) => {
        this.otpLoading = false;
        this.showErrorNotification(err?.message || 'Código OTP inválido o expirado.');
      }
    });
  }

  resendOtpCode(): void {
    if (!this.email || this.otpLoading) return;
    this.otpLoading = true;
    this.forgotPasswordUseCase.passwordResetRequest({ email: this.email }).service({
      success: () => {
        this.otpLoading = false;
        this.showSuccessNotification('Se ha reenviado un nuevo código a tu correo.');
      },
      failure: (err) => {
        this.otpLoading = false;
        this.showErrorNotification(err?.message || 'Error al reenviar código.');
      }
    });
  }

  // --- Modal Visor Legal ---
  openLegalViewer(type: 'privacy' | 'terms'): void {
    this.legalDocType = type;
    this.isLegalViewerOpen = true;
  }

  closeLegalViewer(): void {
    this.isLegalViewerOpen = false;
  }


  // --- Eliminación de Cuenta ---
  openDeleteAccountConfirm(): void {
    this.showDeleteConfirmAlert = true;
  }

  closeDeleteAccountConfirm(): void {
    this.showDeleteConfirmAlert = false;
  }

  executeDeleteAccount(): void {
    this.showDeleteConfirmAlert = false;
    this.spinnerService.show();

    const proceedWithCleanup = () => {
      this.spinnerService.hide();
      this.logoutUserUseCase.clearAllData();
      void this.navService.replace('/login', undefined, false);
    };

    if (this.userId) {
      this.profileUserUseCase.deleteAccount(this.userId).service({
        success: () => proceedWithCleanup(),
        failure: (err) => {
          this.spinnerService.hide();
          this.showErrorNotification(err?.message || 'No se pudo eliminar la cuenta. Inténtalo más tarde.');
        }
      });
    } else {
      proceedWithCleanup();
    }
  }

  // --- Notificaciones ---
  private showSuccessNotification(message: string): void {
    this.alertMessage = message;
    this.showSuccessAlert = true;
  }

  private showErrorNotification(message: string): void {
    this.alertMessage = message;
    this.showErrorAlert = true;
  }

  closeAlerts(): void {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }
}
