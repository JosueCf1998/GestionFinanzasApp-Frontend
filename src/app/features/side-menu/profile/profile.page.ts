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
  ],
})
export class ProfilePage implements OnDestroy {
  userName = "";
  userEmail = "";
  userPhone = "";

  // Badges state
  isEmailVerified = true;
  isPhoneVerified = false;

  // Phone masking & auto-hide
  showPhone = false;
  private phoneTimer: any = null;

  // Alerts state
  showDeactivateAlert = false;
  showDeleteAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;

  // Unified Edit Modal state
  showEditModal = false;
  editField: ProfileFieldType = "name";
  editingValue = "";
  fieldError = "";

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

  // =========================
  // UNIFIED EDIT MODAL (1 STEP)
  // =========================

  openFieldEditor(field: ProfileFieldType | string): void {
    if (field === "Nombre completo" || field === "name") {
      this.editField = "name";
      this.editingValue = this.getSavedName() || (this.userName !== "Nombre y Apellido de Usuario" ? this.userName : "");
    } else if (field === "Correo electrónico" || field === "email") {
      this.editField = "email";
      this.editingValue = this.userEmail;
    } else if (field === "Teléfono" || field === "phone") {
      this.editField = "phone";
      this.editingValue = this.userPhone;
    }

    this.fieldError = "";
    this.showEditModal = true;
  }

  get modalTitle(): string {
    switch (this.editField) {
      case "name":
        return "Editar nombre completo";
      case "email":
        return "Editar correo electrónico";
      case "phone":
        return "Editar teléfono";
    }
  }

  get modalInputLabel(): string {
    switch (this.editField) {
      case "name":
        return "Nombre completo";
      case "email":
        return "Correo electrónico";
      case "phone":
        return "Teléfono";
    }
  }

  get modalInputPlaceholder(): string {
    switch (this.editField) {
      case "name":
        return "Ej. María García";
      case "email":
        return "correo@ejemplo.com";
      case "phone":
        return "999 123 456";
    }
  }

  get modalHelpText(): string {
    switch (this.editField) {
      case "name":
        return "Tal como aparece en tu documento de identidad.";
      case "email":
        return "Usaremos este correo para notificarte movimientos importantes de tu cuenta.";
      case "phone":
        return "Ingresa un número celular de Perú (9 dígitos).";
    }
  }

  clearFieldError(): void {
    this.fieldError = "";
  }

  saveField(): void {
    const value = this.editingValue.trim();

    // Validations
    if (this.editField === "name") {
      if (!value || value.length < 2) {
        this.fieldError = "Ingresa un nombre completo válido.";
        return;
      }
    } else if (this.editField === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value || !emailRegex.test(value)) {
        this.fieldError = "Ingresa un correo electrónico válido.";
        return;
      }
    } else if (this.editField === "phone") {
      const digits = value.replace(/\D/g, "");
      const isPeruStandard = (digits.length === 9 && digits.startsWith("9")) ||
                            (digits.length === 11 && digits.startsWith("519"));
      if (!value || !isPeruStandard) {
        this.fieldError = "El número debe tener 9 dígitos y empezar con 9 (ej. 987654321).";
        return;
      }
    }

    this.loadingService.show();
    this.fieldError = "";

    const payload: ProfileUserRequest = {
      id: this.getUserId(),
      nombre: this.editField === "name" ? value : (this.getSavedName() || this.userName),
      correo: this.editField === "email" ? value : this.userEmail,
      imagen: "",
      telefono: this.editField === "phone" ? value : this.userPhone,
    };

    this.profileUserUseCase.updateProfile(payload).service({
      success: () => {
        this.loadingService.hide();
        this.showEditModal = false;

        if (this.editField === "name") {
          this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, value);
          this.userName = this.normalizeDisplayName(value, this.userEmail);
          this.successMessage = "Tu nombre completo se actualizó correctamente.";
        } else if (this.editField === "email") {
          this.userEmail = value;
          this.isEmailVerified = true;
          this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, value);
          this.successMessage = "Tu correo electrónico se actualizó correctamente.";
        } else if (this.editField === "phone") {
          this.userPhone = value;
          this.isPhoneVerified = true;
          this.localManagementService.setVariable(KEY_MANAGEMENT.PHONE, value);
          this.successMessage = "Tu teléfono se actualizó correctamente.";
        }

        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.fieldError = error?.message || "No se pudieron guardar los cambios.";
      },
    });
  }

  private getSavedName(): string {
    return this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
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

