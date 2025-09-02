import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonImg, IonIcon, IonButton, IonText, IonLabel, IonInput } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { WelcomeServiceUseCase, WelcomeRequest } from 'src/app/core/use-cases/welcomeService.usecase';

@Component({
  selector: 'app-welcome-step-two',
  templateUrl: './welcome-step-two.page.html',
  styleUrls: ['./welcome-step-two.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonText, IonButton, IonIcon, IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class WelcomeStepTwoPage implements OnInit {

  showGenericAlert: boolean = false;

  dataForm = new FormGroup({
    amount: new FormControl("", [Validators.required]),
  });

  constructor(
      private navService: NavigationService,
      private loadingService: SpinnerService,
      private welcomeServiceUseCase: WelcomeServiceUseCase
  ) { }

  ngOnInit() {
  }

  handleContinueButton() {
    const body: WelcomeRequest = {
      name: "Principal",
      amount: this.dataForm.value.amount!,
    }
    console.log(body)
    this.executeCreateAccount(body);
  }

  private executeCreateAccount(body: WelcomeRequest) {
    this.loadingService.show();
    this.welcomeServiceUseCase.createAccount(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.navService.push('/main', 'fade');
        } else if (result.error) {
          if (result.error.description) {
            // this.showUnauthorizedAlert = true;
            // this.messageError = result.error.description;
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
