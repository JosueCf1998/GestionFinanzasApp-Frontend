import { Component } from "@angular/core";
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
export class ProfilePage {
  userName = "";
  userEmail = "";
  userPhone = "";

  showPhone = false;
  showDeactivateAlert = false;
  showDeleteAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  showInfoAlert = false;
  showNameModal = false;
  showOtpModal = false;

  editingName = "";
  editingEmail = "";
  editingPhone = "";
  otpStep = 1;
  otpCode = "";
  verificationField: "email" | "phone" = "email";

  successMessage = "";
  errorMessage = "";
  infoMessage = "";

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

  togglePhoneVisibility(): void {
    this.showPhone = !this.showPhone;
  }

  getPhoneDisplay(): string {
    if (!this.userPhone) {
      return "+51 su numero de celular";
    }

    if (this.showPhone) {
      return this.userPhone;
    }

    return this.maskPhone(this.userPhone);
  }

  getFieldStatus(field: string): string {
    if (field === "Nombre completo") {
      return this.userName && this.userName !== "Nombre y Apellido de Usuario"
        ? "Actualizado"
        : "Pendiente";
    }

    if (field === "Correo electrónico") {
      return this.userEmail ? "Actualizado" : "Pendiente";
    }

    return this.userPhone ? "Actualizado" : "Pendiente";
  }

  openFieldEditor(field: string): void {
    if (field === "Nombre completo") {
      this.editingName = this.getSavedName();
      this.showNameModal = true;
      return;
    }

    this.verificationField = field === "Correo electrónico" ? "email" : "phone";
    this.editingEmail = this.userEmail;
    this.editingPhone = this.userPhone;
    this.otpStep = 1;
    this.otpCode = "";
    this.showOtpModal = true;
  }

  private maskPhone(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length <= 4) {
      return phone;
    }

    const visibleStart = cleanPhone.slice(0, 3);
    const visibleEnd = cleanPhone.slice(-2);
    return `+${visibleStart} ••• ••• ${visibleEnd}`;
  }

  private getSavedName(): string {
    return this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
  }

  private buildProfilePayload(): ProfileUserRequest {
    return {
      id: this.getUserId(),
      nombre: this.userName || this.getSavedName(),
      correo: this.userEmail,
      imagen: "",
      telefono: this.userPhone,
    };
  }

  saveName(): void {
    const trimmedName = this.editingName.trim();

    if (!trimmedName) {
      this.showError("Debes ingresar un nombre completo válido.");
      return;
    }

    this.loadingService.show();
    this.showNameModal = false;

    this.profileUserUseCase
      .updateProfile({
        id: this.getUserId(),
        nombre: trimmedName,
        correo: this.userEmail,
        imagen: "",
        telefono: this.userPhone,
      })
      .service({
        success: () => {
          this.loadingService.hide();
          this.localManagementService.setVariable(
            KEY_MANAGEMENT.NAME,
            trimmedName,
          );
          this.userName = this.normalizeDisplayName(
            trimmedName,
            this.userEmail,
          );
          this.successMessage =
            "Tu nombre completo se actualizó correctamente.";
          this.showSuccessAlert = true;
        },
        failure: (error) => {
          this.loadingService.hide();
          this.showError(
            error?.message || "No se pudo actualizar tu nombre completo.",
          );
        },
      });
  }

  requestOtp(): void {
    if (this.verificationField === "email") {
      const email = this.editingEmail.trim();
      if (!email || !email.includes("@")) {
        this.showError("Ingresa un correo electrónico válido.");
        return;
      }
    }

    if (this.verificationField === "phone") {
      const phone = this.editingPhone.trim();
      if (!phone || phone.replace(/\D/g, "").length < 8) {
        this.showError("Ingresa un teléfono válido.");
        return;
      }
    }

    this.otpStep = 2;
    this.otpCode = "123456";
    this.infoMessage =
      "Se ha enviado un código OTP de prueba para confirmar tu actualización.";
    this.showInfoAlert = true;
  }

  verifyOtp(): void {
    if (!this.otpCode.trim()) {
      this.showError("Ingresa el código OTP para continuar.");
      return;
    }

    if (this.otpCode.trim() !== "123456") {
      this.showError("El código OTP ingresado no es válido.");
      return;
    }

    this.loadingService.show();
    this.showOtpModal = false;

    const payload: ProfileUserRequest = {
      id: this.getUserId(),
      nombre: this.userName || this.getSavedName(),
      correo: this.userEmail,
      imagen: "",
      telefono: this.userPhone,
    };

    if (this.verificationField === "email") {
      payload.correo = this.editingEmail.trim();
    }

    if (this.verificationField === "phone") {
      payload.telefono = this.editingPhone.trim();
    }

    this.profileUserUseCase.updateProfile(payload).service({
      success: () => {
        this.loadingService.hide();
        const phoneValue = payload.telefono ?? "";

        if (this.verificationField === "email") {
          this.userEmail = payload.correo;
          this.localManagementService.setVariable(
            KEY_MANAGEMENT.EMAIL,
            payload.correo,
          );
          this.successMessage =
            "Tu correo electrónico se actualizó correctamente.";
        } else {
          this.userPhone = phoneValue;
          this.localManagementService.setVariable(
            KEY_MANAGEMENT.PHONE,
            phoneValue,
          );
          this.successMessage = "Tu teléfono se actualizó correctamente.";
        }

        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(
          error?.message || "No se pudo confirmar la información del perfil.",
        );
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
    this.navService.replace("/splash");
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorAlert = true;
  }
}
