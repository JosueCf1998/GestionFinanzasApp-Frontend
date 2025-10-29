import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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
  ForgotPasswordServiceUseCase,
  ForgotPasswordRequest
} from "src/app/core/use-cases/forgotPasswordService.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
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
export class ForgotPasswordPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    repeatPassword: new FormControl("", [Validators.required]),
  });

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private encryptionService: EncryptionService,
    private fb: FormBuilder,
    private forgotPasswordServiceUseCase: ForgotPasswordServiceUseCase,
    private loadingService: SpinnerService
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  navigateToLogin() {
    this.navService.forward('/login', 'slide-right');
  }

  handleForgotPassword() {
    if (this.loginForm.invalid) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return;
    }
    const body: ForgotPasswordRequest = {
      email: this.loginForm.value.email!,
      new_password: this.loginForm.value.password!,
    };
    this.executeForgotPassword(body);
  }

  private executeForgotPassword(body: ForgotPasswordRequest) {
    this.loadingService.show();
    this.forgotPasswordServiceUseCase.forgotPassword(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.navService.forward('/login', 'slide-right');
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
