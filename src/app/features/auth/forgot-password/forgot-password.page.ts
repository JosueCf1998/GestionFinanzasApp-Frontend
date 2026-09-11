import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {
  IonContent,
  IonIcon,
  IonButton,
  IonItem,
  IonInput,
} from "@ionic/angular/standalone";
import { NavigationService } from "../../../core/services/navigation.service";
import {
  ForgotPasswordUserUseCase,
  ForgotPassworUserdRequest
} from "src/app/core/use-cases/users/forgot-password-user.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import { validate, validateMatch } from "src/app/core/utils/password-validation.util";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    CustomAlertComponent,
    BaseModalComponent
  ],
})
export class ForgotPasswordPage {

  forgotForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
  });

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  showOtpModal = false;

  pendingEmail = '';
  resetToken = '';
  otpCode = '';

  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false;
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private forgotPasswordUseCase: ForgotPasswordUserUseCase,
    private loadingService: SpinnerService
  ) {}

  // MARK: - SERVICIOS

  private requestPasswordReset(email: string) {
    this.loadingService.show();
    this.forgotPasswordUseCase.passwordResetRequest({ email }).service({
      success: (data) => {
        this.loadingService.hide();
        if (data !== null) {
          this.pendingEmail = email;
          this.resetToken = '';
          this.otpCode = '';
          this.showOtpModal = true;
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        if (error) {
          this.showUnauthorizedAlert = true;
          this.messageError = error.message;
        } else {
          this.showGenericAlert = true;
        }
      }
    });
  }

  private confirmPasswordReset(password: string) {
    const token = this.resetToken.trim();
    const otp = this.otpCode.trim();

    if (!token) {
      this.showUnauthorizedAlert = true;
      this.messageError = 'Ingresa el token de recuperación recibido por correo.';
      return;
    }

    if (!otp || otp.length !== 6) {
      this.showUnauthorizedAlert = true;
      this.messageError = 'Ingresa el código OTP de 6 dígitos.';
      return;
    }

    this.loadingService.show();
    this.forgotPasswordUseCase.passwordResetConfirm({
      email: this.pendingEmail,
      reset_token: token,
      otp_code: otp,
      new_password: password,
    }).service({
      success: async () => {
        this.loadingService.hide();
        this.showOtpModal = false;
        this.showGenericAlert = true;
        this.messageError = 'Contraseña actualizada correctamente.';
        setTimeout(async () => {
          this.showGenericAlert = false;
          await this.navService.replace('/login');
        }, 1200);
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showUnauthorizedAlert = true;
        this.messageError = error?.message ?? 'No se pudo restablecer la contraseña.';
      }
    });
  }

  // MARK: - FUNCTIONS

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  goBack() {
    this.navService.back();
  }

  handleForgotPassword() {
    if (this.forgotForm.invalid) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return;
    }

    const password = this.forgotForm.value.password || "";
    const repeatPassword = this.forgotForm.value.repeatPassword || "";

    const passwordError = validate(password);
    if (passwordError) {
      this.showUnauthorizedAlert = true;
      this.messageError = passwordError;
      return;
    }

    const matchError = validateMatch(password, repeatPassword);
    if (matchError) {
      this.showUnauthorizedAlert = true;
      this.messageError = matchError;
      return;
    }

    const email = (this.forgotForm.value.email || '').trim().toLowerCase();
    this.requestPasswordReset(email);
  }

  confirmOtpReset(): void {
    const password = this.forgotForm.value.password || '';
    this.confirmPasswordReset(password);
  }

  closeOtpModal(): void {
    this.showOtpModal = false;
    this.resetToken = '';
    this.otpCode = '';
    this.pendingEmail = '';
  }

  closeAlerts() {
    this.showGenericAlert = false;
    this.showUnauthorizedAlert = false;
  }
}
