import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  Validators,
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
  RegisterUserUseCase,
  RegisterUserRequest
} from "src/app/core/use-cases/users/register-user.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import { validate, validateMatch } from "src/app/core/utils/password-validation.util";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    CustomAlertComponent,
    BaseModalComponent
  ],
})
export class RegisterPage {

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
  });

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  showSuccessAlert: boolean = false;
  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false;
  showVerificationModal = false;
  messageError: string = '';
  verificationCode = '';
  pendingEmail = '';

  constructor(
    private navService: NavigationService,
    private registerUserUseCase: RegisterUserUseCase,
    private loadingService: SpinnerService
  ) {}

  // MARK: - SERVICES

  private executeRegister(body: RegisterUserRequest) {
    this.loadingService.show();
    this.registerUserUseCase.requestRegistration(body).service({
      success: (data) => {
        this.loadingService.hide();

        if (data !== null) {
          this.pendingEmail = body.email;
          this.verificationCode = '';
          this.showVerificationModal = true;
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

  onVerificationCodeInput(event: any): void {
    const rawValue = event?.detail?.value ?? '';
    const digits = rawValue.replace(/\D/g, '').slice(0, 6);
    this.verificationCode = digits;
  }

  closeVerificationModal(): void {
    this.showVerificationModal = false;
    this.verificationCode = '';
    this.pendingEmail = '';
  }

  confirmVerificationCode(): void {
    const code = this.verificationCode.trim();

    if (!code || code.length !== 6) {
      this.showUnauthorizedAlert = true;
      this.messageError = 'Ingresa un código de verificación de 6 dígitos.';
      return;
    }

    this.loadingService.show();
    this.registerUserUseCase.verifyRegistration({
      email: this.pendingEmail,
      code
    }).service({
      success: () => {
        this.loadingService.hide();
        this.showVerificationModal = false;
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showUnauthorizedAlert = true;
        this.messageError = error?.message ?? 'El código ingresado es inválido.';
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

  handleRegister() {
    if (this.registerForm.invalid) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return;
    }

    const password = this.registerForm.value.password || "";
    const repeatPassword = this.registerForm.value.repeatPassword || "";

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

    const body: RegisterUserRequest = {
      name: this.registerForm.value.name!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: password,
    };
    this.executeRegister(body);
  }

  async handleSuccessConfirm() {
    this.showSuccessAlert = false;
    await this.navService.replace('/login');
  }

  closeAlerts() {
    this.showGenericAlert = false;
    this.showUnauthorizedAlert = false;
  }
}
