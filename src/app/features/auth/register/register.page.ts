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
  RegisterServiceUseCase,
  RegisterRequest
} from "src/app/core/use-cases/registerService.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
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
    private registerServiceUseCase: RegisterServiceUseCase,
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

  handleRegister() {
    if (this.loginForm.invalid) {
      this.showUnauthorizedAlert = true;
      this.messageError = "Ingresa tus credenciales correctamente.";
      return;
    }
    const body: RegisterRequest = {
      name: this.loginForm.value.name!,
      lastName: this.loginForm.value.lastName!,
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.executeRegister(body);
  }

  private executeRegister(body: RegisterRequest) {
    this.loadingService.show();
    this.registerServiceUseCase.register(body).subscribe({
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