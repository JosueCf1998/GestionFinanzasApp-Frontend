import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonImg, IonIcon, IonButton, IonText, IonLabel, IonInput } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { WelcomeServiceUseCase, WelcomeRequest } from 'src/app/core/use-cases/welcomeService.usecase';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { CreateAccountRequest, CreateAccountUseCase } from 'src/app/core/use-cases/accounts/create-account.usecase';

@Component({
  selector: 'app-welcome-step-two',
  templateUrl: './welcome-step-two.page.html',
  styleUrls: ['./welcome-step-two.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonText, IonButton, IonIcon, IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class WelcomeStepTwoPage implements OnInit {

  showGenericAlert: boolean = false;
  private numericValue: number = 0;

  dataForm = new FormGroup({
    amount: new FormControl("0.00", [Validators.required]),
  });

  constructor(
      private navService: NavigationService,
      private loadingService: SpinnerService,
      private createAccountUseCase: CreateAccountUseCase,
      private localManagementService: LocalManagementService
  ) { }

  ngOnInit() {
  }

  onKeyDown(event: any) {
    const key = event.key;
    
    // Permitir teclas de control
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      if (key === 'Backspace' || key === 'Delete') {
        event.preventDefault();
        this.removeLastDigit();
      }
      return;
    }
    
    // Bloquear todo lo que no sea número
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
      return;
    }
  }

  onAmountInput(event: any) {
    const input = event.detail.value || '';
    const numbers = input.replace(/[^0-9]/g, '');
    
    if (numbers.length > 0) {
      // Convertir a número y dividir por 100 para mantener 2 decimales
      this.numericValue = parseInt(numbers) || 0;
      const formatted = (this.numericValue / 100).toFixed(2);
      this.dataForm.get('amount')?.setValue(formatted, { emitEvent: false });
    } else {
      this.numericValue = 0;
      this.dataForm.get('amount')?.setValue('0.00', { emitEvent: false });
    }
  }

  removeLastDigit() {
    this.numericValue = Math.floor(this.numericValue / 10);
    const formatted = (this.numericValue / 100).toFixed(2);
    this.dataForm.get('amount')?.setValue(formatted, { emitEvent: false });
  }

  handleContinueButton() {
    const body: CreateAccountRequest = {
      name: "Principal",
      amount: this.numericValue / 100,
      icon: "bills",
      color: "#afb42b"
    }
    this.executeCreateAccount(body);
  }

  private executeCreateAccount(body: CreateAccountRequest) {
      this.loadingService.show();
      this.createAccountUseCase.createAccount(body).subscribe({
        next: (result) => {
          this.loadingService.hide();
          if (result.success && result.data) {
            this.navService.push('/main');
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
