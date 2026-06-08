import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { CreateAccountRequest, CreateAccountUseCase } from 'src/app/core/use-cases/accounts/create-account.usecase';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-welcome-step-two',
  templateUrl: './welcome-step-two.page.html',
  styleUrls: ['./welcome-step-two.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent, CommonModule, ReactiveFormsModule, AmountInputComponent]
})
export class WelcomeStepTwoPage implements OnInit {

  showGenericAlert: boolean = false;

  dataForm = new FormGroup({
    amount: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  constructor(
      private navService: NavigationService,
      private loadingService: SpinnerService,
      private createAccountUseCase: CreateAccountUseCase
  ) { }

  ngOnInit() {
  }

  handleContinueButton() {
    const body: CreateAccountRequest = {
      name: "Principal",
      amount: this.dataForm.controls.amount.value ?? 0,
      icon: "bills",
      color: "#afb42b"
    }
    this.executeCreateAccount(body);
  }

  private executeCreateAccount(body: CreateAccountRequest) {
      this.loadingService.show();
      this.createAccountUseCase.createAccount(body).service({
        success: (result) => {
          this.loadingService.hide();
          if (result.success && result.data) {
            this.navService.push('/main');
          } else if (result.error) {
            if ((result as any).error?.description) {
              // this.showUnauthorizedAlert = true;
              // this.messageError = result.error.description;
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

}
