import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { NavigationService } from "src/app/core/services/navigation.service";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { LocalManagementService } from "src/app/core/services/localManagementService.service";
import { KEY_MANAGEMENT } from "src/app/core/constants/key-management.constants";
import "src/app/core/utils/observable-extensions";

import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import { SectionCardComponent } from "src/app/shared/components/section-card/section-card.component";
import { WarningMessageComponent } from "src/app/shared/components/warning-message/warning-message.component";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { ProfileFieldEditModalComponent } from "./profile-field-edit-modal/profile-field-edit-modal.component";

import { DeactivateAccountUseCase } from "src/app/core/use-cases/users/deactivate-account.usecase";
import { DeleteUserAccountUseCase } from "src/app/core/use-cases/users/delete-user-account.usecase";
import { LogoutUserUseCase } from "src/app/core/use-cases/users/logout-user.usecase";
import {
  ProfileUserRequest,
  ProfileUserUseCase,
} from "src/app/core/use-cases/users/profile-user.usecase";

export type ProfileFieldType = "name" | "email" | "phone";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeatureHeaderComponent,
    SectionCardComponent,
    WarningMessageComponent,
    ButtonComponent,
    CustomAlertComponent,
    ProfileFieldEditModalComponent,
  ],
})
export class ProfilePage implements OnDestroy {
  userName = "";
  userEmail = "";
  userPhone = "";

  // Badges state
  isEmailVerified = true;
  isPhoneVerified = false;
  isTwoFactorEnabled = false;

  // Phone masking & auto-hide
  showPhone = false;
  showEmail = false;
  private phoneTimer: any = null;

  // Alerts state
  showDeactivateAlert = false;
  showDeleteAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;

  // Separate Modal states
  showNameModal = false;
  showEmailModal = false;
  showPhoneModal = false;

  successMessage = "";
  errorMessage = "";

  constructor(
    private deactivateAccountUseCase: DeactivateAccountUseCase,
    private deleteUserAccountUseCase: DeleteUserAccountUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private localManagementService: LocalManagementService,
    private profileUserUseCase: ProfileUserUseCase,
  ) {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.clearPhoneTimer();
  }

  private loadUserData(): void {
    const storedName =
      this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
    const storedEmail =
      this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || "";
    const storedPhone =
      this.localManagementService.getVariable(KEY_MANAGEMENT.PHONE) || "";

    this.userName = this.normalizeDisplayName(storedName, storedEmail);
    this.userEmail = storedEmail;
    this.userPhone = storedPhone;

    this.isEmailVerified = !!this.userEmail;
    this.isPhoneVerified = !!this.userPhone;
  }

  private normalizeDisplayName(name: string, email: string): string {
    const trimmedName = (name || "").trim();
    if (trimmedName) {
      return trimmedName
        .split(" ")
        .filter(Boolean)
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
        )
        .join(" ");
    }

    if (email) {
      return email
        .split("@")[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
        )
        .join(" ");
    }

    return "Nombre y Apellido de Usuario";
  }

  private getUserId(): string {
    return this.localManagementService.getVariable(KEY_MANAGEMENT.ID) || "";
  }

  // =========================
  // PHONE MASKING & AUTO-HIDE
  // =========================

  togglePhoneVisibility(): void {
    this.showPhone = !this.showPhone;
    this.clearPhoneTimer();

    if (this.showPhone) {
      // Auto re-mask after 15 seconds of inactivity
      this.phoneTimer = setTimeout(() => {
        this.showPhone = false;
      }, 15000);
    }
  }

  private clearPhoneTimer(): void {
    if (this.phoneTimer) {
      clearTimeout(this.phoneTimer);
      this.phoneTimer = null;
    }
  }

  getPhoneDisplay(): string {
    if (!this.userPhone) {
      return "";
    }

    if (this.showPhone) {
      return this.formatPhoneFull(this.userPhone);
    }

    return this.maskPhone(this.userPhone);
  }

  private formatPhoneFull(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 9) {
      return `+51 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    if (digits.startsWith("51") && digits.length === 11) {
      const num = digits.slice(2);
      return `+51 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
    }
    return phone;
  }

  private maskPhone(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    let core9 = digits;

    if (digits.startsWith("51") && digits.length === 11) {
      core9 = digits.slice(2);
    }

    if (core9.length === 9) {
      return `+51 ${core9.slice(0, 3)} *** ${core9.slice(6)}`;
    }

    if (digits.length > 4) {
      const start = digits.slice(0, 3);
      const end = digits.slice(-3);
      return `+51 ${start} *** ${end}`;
    }

    return phone;
  }

  getEmailDisplay(): string {
    if (!this.userEmail) {
      return '';
    }

    if (this.showEmail) {
      return this.userEmail;
    }

    const atIndex = this.userEmail.indexOf('@');
    if (atIndex <= 0) {
      return this.userEmail;
    }

    const localPart = this.userEmail.slice(0, atIndex);
    const domain = this.userEmail.slice(atIndex);

    if (localPart.length <= 2) {
      return `${localPart[0]}***${domain}`;
    }

    return `${localPart.slice(0, 2)}***${domain}`;
  }

  toggleEmailVisibility(): void {
    this.showEmail = !this.showEmail;
  }

  // =========================
  // BADGES STATUS
  // =========================

  getFieldStatus(field: ProfileFieldType | string): "Verificado" | "Pendiente" {
    if (field === "email" || field === "Correo electrónico") {
      return this.isEmailVerified ? "Verificado" : "Pendiente";
    }

    if (field === "phone" || field === "Teléfono") {
      return this.isPhoneVerified ? "Verificado" : "Pendiente";
    }

    return "Verificado";
  }

  getTwoFactorStatus(): "Activada" | "Desactivada" {
    return this.isTwoFactorEnabled ? "Activada" : "Desactivada";
  }

  openChangePassword(): void {
    this.showError("La pantalla de cambio de contraseña estará disponible en una próxima actualización.");
  }

  openTwoFactorConfig(): void {
    this.showError("La configuración de verificación en dos pasos estará disponible en una próxima actualización.");
  }

  // =========================
  // FIELD EDIT MODALS
  // =========================

  get savedName(): string {
    return this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
  }

  openNameEditor(): void {
    this.showNameModal = true;
  }

  openEmailEditor(): void {
    this.showEmailModal = true;
  }

  openPhoneEditor(): void {
    this.showPhoneModal = true;
  }

  onNameSaved(value: string): void {
    this.showNameModal = false;
    this.loadingService.show();

    const payload: ProfileUserRequest = {
      id: this.getUserId(),
      nombre: value,
      correo: this.userEmail,
      imagen: "",
      telefono: this.userPhone,
    };

    this.profileUserUseCase.updateProfile(payload).service({
      success: () => {
        this.loadingService.hide();
        this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, value);
        this.userName = this.normalizeDisplayName(value, this.userEmail);
        this.successMessage = "Tu nombre completo se actualizó correctamente.";
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(error?.message || "No se pudieron guardar los cambios.");
      },
    });
  }

  onEmailSaved(value: string): void {
    this.showEmailModal = false;
    this.loadingService.show();

    const payload: ProfileUserRequest = {
      id: this.getUserId(),
      nombre: this.savedName || this.userName,
      correo: value,
      imagen: "",
      telefono: this.userPhone,
    };

    this.profileUserUseCase.updateProfile(payload).service({
      success: () => {
        this.loadingService.hide();
        this.userEmail = value;
        this.isEmailVerified = true;
        this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, value);
        this.successMessage = "Tu correo electrónico se actualizó correctamente.";
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(error?.message || "No se pudieron guardar los cambios.");
      },
    });
  }

  onPhoneSaved(value: string): void {
    this.showPhoneModal = false;
    this.loadingService.show();

    const payload: ProfileUserRequest = {
      id: this.getUserId(),
      nombre: this.savedName || this.userName,
      correo: this.userEmail,
      imagen: "",
      telefono: value,
    };

    this.profileUserUseCase.updateProfile(payload).service({
      success: () => {
        this.loadingService.hide();
        this.userPhone = value;
        this.isPhoneVerified = true;
        this.localManagementService.setVariable(KEY_MANAGEMENT.PHONE, value);
        this.successMessage = "Tu teléfono se actualizó correctamente.";
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(error?.message || "No se pudieron guardar los cambios.");
      },
    });
  }

  // =========================
  // NAVIGATION
  // =========================

  backToMenu(): void {
    this.navService.back();
  }

  // =========================
  // DEACTIVATE ACCOUNT
  // =========================

  deactivateAccount(): void {
    this.showDeactivateAlert = true;
  }

  confirmDeactivate(): void {
    this.showDeactivateAlert = false;
    const userId = this.getUserId();

    if (!userId) {
      this.showError("No se pudo identificar al usuario.");
      return;
    }

    this.loadingService.show();
    this.deactivateAccountUseCase.execute({ userId }).service({
      success: () => {
        this.loadingService.hide();
        this.logoutUserUseCase.logout();
        this.successMessage =
          "Tu cuenta ha sido desactivada temporalmente. Puedes reactivarla iniciando sesión nuevamente.";
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(
          error?.message ||
            "No se pudo desactivar la cuenta. Intenta nuevamente.",
        );
      },
    });
  }

  // =========================
  // DELETE ACCOUNT
  // =========================

  deleteAccount(): void {
    this.showDeleteAlert = true;
  }

  confirmDelete(): void {
    this.showDeleteAlert = false;
    const userId = this.getUserId();

    if (!userId) {
      this.showError("No se pudo identificar al usuario.");
      return;
    }

    this.loadingService.show();
    this.deleteUserAccountUseCase.execute({ userId }).service({
      success: () => {
        this.loadingService.hide();
        this.logoutUserUseCase.logout();
        this.successMessage =
          "Tu cuenta ha sido eliminada permanentemente. Todos tus datos han sido borrados.";
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(
          error?.message ||
            "No se pudo eliminar la cuenta. Intenta nuevamente.",
        );
      },
    });
  }

  // =========================
  // HELPERS
  // =========================

  handleSuccessConfirm(): void {
    this.showSuccessAlert = false;
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorAlert = true;
  }
}

