import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonIcon,
  IonButton,
  IonItem,
  IonText,
  IonInput,
} from "@ionic/angular/standalone";
import { NavigationService } from "../../../core/services/navigation.service";
import { EncryptionService } from "../../../core/services/encryption.service";
import {
  LoginServiceUseCase,
  LoginResponse,
  LoginRequest,
} from "src/app/core/use-cases/loginService.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";
import { LocalManagementService } from "src/app/core/services/localManagementService.service";
import { KEY_MANAGEMENT } from "src/app/core/constants/key-management.constants";
import { ListAccountsUseCase } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { LoginUserRequest, LoginUserUseCase } from "src/app/core/use-cases/users/login-user.usecase";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    IonInput,
    IonText,
    IonItem,
    IonButton,
    IonIcon,
    IonImg,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    DynamicAlertComponent
],
})
export class LoginPage implements OnInit {

  showPassword: boolean = false;
  private readonly minPasswordLength = 6;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private loginUserUseCase: LoginUserUseCase,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService
  ) {}

  ngOnInit() {
  }

  // MARK: - SERVICIOS

  private executeLogin(body: LoginUserRequest) {
    this.loadingService.show();
    this.loginUserUseCase.execute(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
           this.executeAccountList();
        } else if (result.error) {
          if (result.error.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = result.error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.navService.push("/welcome-step-one");
          /*
          if (result.data.items.length == 0) {
            this.navService.push("/welcome-step-one");
          } else {
            this.navService.push('/main')
          }
          */
        } else if (result.error) {
          if (result.error.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = result.error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCTIONS

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.validationLogin()) {
      return;
    }
    
    const body: LoginRequest = {
      email: this.loginForm.value.email!.trim().toLowerCase(),
      password: this.loginForm.value.password!,
    };
    this.executeLogin(body);
  }

  validationLogin(): boolean {
    // Validar que el formulario tenga valores
    if (this.loginForm.invalid) {
      return this.showValidationError("Ingresa tus credenciales correctamente.");
    }

    const email = this.loginForm.value.email?.trim() || '';
    const password = this.loginForm.value.password || '';

    // Validar que los campos no estén vacíos después del trim
    if (!email || !password) {
      return this.showValidationError("Por favor completa todos los campos.");
    }

    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return this.showValidationError("Por favor ingresa un correo electrónico válido.");
    }

    // Validar que el email no contenga espacios
    if (email.includes(' ')) {
      return this.showValidationError("El correo electrónico no debe contener espacios.");
    }

    const passwordError = this.validatePassword(password);
    if (passwordError) {
      return this.showValidationError(passwordError);
    }

    // Validar longitud máxima razonable
    if (email.length > 254) {
      return this.showValidationError("El correo electrónico excede la longitud permitida.");
    }

    return true;
  }

  private validatePassword(password: string): string | null {
    const validations = [
      {
        isValid: password.trim().length > 0,
        message: "La contraseña no puede contener solo espacios.",
      },
      {
        isValid: password.length >= this.minPasswordLength,
        message: `La contraseña debe tener al menos ${this.minPasswordLength} caracteres.`,
      },
      {
        isValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        message: "La contraseña debe incluir al menos un carácter especial.",
      },
      {
        isValid: password.length <= 128,
        message: "La contraseña excede la longitud permitida.",
      },
    ];

    const failedValidation = validations.find((validation) => !validation.isValid);
    return failedValidation ? failedValidation.message : null;
  }

  private showValidationError(message: string): false {
    this.showUnauthorizedAlert = true;
    this.messageError = message;
    return false;
  }

  forgotPassword() {
    this.navService.push('/forgot-password');
  }

  goToRegister() {
    this.navService.push('/register');
  }

}
