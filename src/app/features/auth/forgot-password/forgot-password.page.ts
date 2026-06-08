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
  ForgotPasswordUserUseCase,
  ForgotPassworUserdRequest
} from "src/app/core/use-cases/users/forgot-password-user.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { DynamicAlertComponent } from "src/app/shared/components/basic-alert/basic-alert.component";
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
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonInput,
    DynamicAlertComponent
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

  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false;
  messageError: string = '';

  constructor(
    private navService: NavigationService,
    private forgotPasswordUseCase: ForgotPasswordUserUseCase,
    private loadingService: SpinnerService
  ) {}

  // MARK: - SERVICIOS

  private executeForgotPassword(body: ForgotPassworUserdRequest) {
    this.loadingService.show();
    this.forgotPasswordUseCase.forgotPassword(body).service({
      success: async (data) => {
        this.loadingService.hide();
        if (data) {
          await this.navService.replace('/login');
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

    const body: ForgotPassworUserdRequest = {
      email: this.forgotForm.value.email!,
      new_password: password,
    };
    this.executeForgotPassword(body);
  }

  closeAlerts() {
    this.showGenericAlert = false;
    this.showUnauthorizedAlert = false;
  }
}
