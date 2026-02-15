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
  IonLabel,
  IonItem,
  IonList,
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
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";
import { LocalManagementService } from "src/app/core/services/localManagementService.service";
import { KEY_MANAGEMENT } from "src/app/core/constants/key-management.constants";
import { ListAccountsUseCase } from "src/app/core/use-cases/accounts/list-accounts.usecase";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    IonInput,
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    CustomAlertComponent,
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
    private loginServiceUseCase: LoginServiceUseCase,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService,
    private localManagementService: LocalManagementService
  ) {}

  ngOnInit() {
    let token = this.localManagementService.getVariable(KEY_MANAGEMENT.TOKEN);
    console.log(token == null ? "No hay token almacenado" : "Token encontrado en localStorage");
  }

  // MARK: - SERVICIOS

  private executeLogin(body: LoginRequest) {
    this.loadingService.show();
    this.loginServiceUseCase.login(body).subscribe({
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
          console.log("Cuentas obtenidas:", result.data.items);
          if (result.data.items.length < 2) {
            this.navService.push("/welcome-step-one", "fade");
          } else {
            this.navService.push('/main', 'fade')
          }
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
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return false;
    }

    const email = this.loginForm.value.email?.trim() || '';
    const password = this.loginForm.value.password || '';

    // Validar que los campos no estén vacíos después del trim
    if (!email || !password) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Por favor completa todos los campos.";
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Por favor ingresa un correo electrónico válido.";
      return false;
    }

    // Validar que el email no contenga espacios
    if (email.includes(' ')) {
      this.showUnauthorizedAlert = true;
      this.messageError = "El correo electrónico no debe contener espacios.";
      return false;
    }

    // Validar longitud mínima de contraseña
    //TODO: Agregar al final
    /*
    if (password.length < 6) {
      this.showUnauthorizedAlert = true;
      this.messageError = "La contraseña debe tener al menos 6 caracteres.";
      return false;
    }
    */

    // Validar que la contraseña no contenga solo espacios
    if (password.trim().length === 0) {
      this.showUnauthorizedAlert = true;
      this.messageError = "La contraseña no puede contener solo espacios.";
      return false;
    }

    // Validar longitud máxima razonable
    if (email.length > 254 || password.length > 128) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Los datos ingresados exceden la longitud permitida.";
      return false;
    }

    return true;
  }

  forgotPassword() {
    this.navService.push('/forgot-password', 'slide-left');
  }

  goToRegister() {
    this.navService.push('/register', 'slide-left');
  }

  private isFirstLogin(): boolean {
    const firstLoginFlag = this.localManagementService.getVariable(KEY_MANAGEMENT.FIRST_LOGIN);
    return firstLoginFlag === null || firstLoginFlag === 'false';
  }

}
