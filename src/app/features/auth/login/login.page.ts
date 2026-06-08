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
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";
import { LocalManagementService } from "src/app/core/services/localManagementService.service";
import { KEY_MANAGEMENT } from "src/app/core/constants/key-management.constants";
import { ListAccountsUseCase } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { LoginUserRequest, LoginUserResponse, LoginUserUseCase } from "src/app/core/use-cases/users/login-user.usecase";
import { validate } from "src/app/core/utils/password-validation.util";
import { DecryptionCryptoUseCase } from "src/app/core/use-cases/crypto/decryption.usecase";
import { EncryptionCryptoUseCase } from "src/app/core/use-cases/crypto/encryption.usecase";
import 'src/app/core/utils/observable-extensions';

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
    private loadingService: SpinnerService,
  ) {}

  ngOnInit() {
  }

  // MARK: - SERVICIOS

  private executeLogin(body: LoginUserRequest) {
    this.loadingService.show();
    this.loginUserUseCase.execute(body).service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          const responseError = this.validateLoginResponse(result.data);
          if (responseError) {
            this.showUnauthorizedAlert = true;
            this.messageError = responseError;
            return;
          }
          this.executeAccountList();
        } else if (result.error) {
          console.log(result.error);
          if ((result as any).error?.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = (result as any).error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          console.log("error desconocido");
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          if (result.data.items.length == 0) {
            this.navService.push("/welcome-step-one");
          } else {
            this.navService.push('/main')
          }
        } else if (result.error) {
          if ((result as any).error?.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = (result as any).error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
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
    const { email, password } = this.sanitizeCredentials();

    if (!this.validationLogin(email, password)) {
      return;
    }
    
    const body: LoginUserRequest = {
      email,
      password,
    };
    this.executeLogin(body);
  }

  validationLogin(email: string, password: string): boolean {
    // Validar que el formulario tenga valores
    if (this.loginForm.invalid) {
      return this.showValidationError("Ingresa tus credenciales correctamente.");
    }

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

    // Requerir al menos un carácter especial en la contraseña
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~]/;
    if (!specialCharRegex.test(password)) {
      return this.showValidationError("La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%).");
    }

    const passwordError = validate(password);
    if (passwordError) {
      return this.showValidationError(passwordError);
    }

    // Validar longitud máxima razonable
    if (email.length > 254) {
      return this.showValidationError("El correo electrónico excede la longitud permitida.");
    }

    return true;
  }

  private sanitizeCredentials(): { email: string; password: string } {
    const rawEmail = this.loginForm.value.email || "";
    const rawPassword = this.loginForm.value.password || "";

    const email = rawEmail.trim().toLowerCase().replace(/\s+/g, "");
    const password = rawPassword.trim();

    this.loginForm.patchValue({ email, password }, { emitEvent: false });

    return { email, password };
  }

  private validateLoginResponse(data: LoginUserResponse): string | null {
    if (!data.token || data.token.trim().length === 0) {
      return "No se recibió un token válido en el inicio de sesión.";
    }

    if (data.user?.correo && data.user.correo.includes(" ")) {
      return "El correo del usuario recibido no es válido.";
    }

    return null;
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
