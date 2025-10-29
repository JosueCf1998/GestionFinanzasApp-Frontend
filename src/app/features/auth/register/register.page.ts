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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonItem,
  IonInput,
  IonButtons,
  IonBackButton,
} from "@ionic/angular/standalone";
import { NavigationService } from "../../../core/services/navigation.service";
import {
  RegisterServiceUseCase,
  RegisterRequest
} from "src/app/core/use-cases/registerService.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    IonButtons,
    IonBackButton,
    DynamicAlertComponent
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
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private registerServiceUseCase: RegisterServiceUseCase,
    private loadingService: SpinnerService
  ) {}

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
    
    const body: RegisterRequest = {
      nombre: this.registerForm.value.name!,
      apellidos: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    this.executeRegister(body);
  }

  private executeRegister(body: RegisterRequest) {
    this.loadingService.show();
    this.registerServiceUseCase.register(body).subscribe({
      next: async (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.showSuccessAlert = true;
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

  async handleSuccessConfirm() {
    this.showSuccessAlert = false;
    await this.navService.replace('/login');
  }

  closeAlerts() {
    this.showGenericAlert = false;
    this.showUnauthorizedAlert = false;
  }
}