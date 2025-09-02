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
    private encryptionService: EncryptionService,
    private fb: FormBuilder,
    private loginServiceUseCase: LoginServiceUseCase,
    private loadingService: SpinnerService
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.invalid) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return;
    }
    const body: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.executeLogin(body);
  }

  forgotPassword() {
    this.navService.push('/forgot-password', 'slide-left');
  }

  goToRegister() {
    this.navService.push('/register', 'slide-left');
  }

  private executeLogin(body: LoginRequest) {
    this.loadingService.show();
    this.loginServiceUseCase.login(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.navService.push("/welcome-step-one", "fade");
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

}
