import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonIcon, IonButton, IonLabel, IonItem, IonList, IonText, IonInput } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';
import { EncryptionService } from '../../../core/services/encryption.service';
import { LoginServiceUseCase, LoginResponse, LoginRequest } from 'src/app/core/use-cases/loginService.usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput, IonText, IonList, IonItem, IonLabel, IonButton, IonIcon, IonImg,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {

  showPassword: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private navService: NavigationService,
    private encryptionService: EncryptionService,
    private fb: FormBuilder,
    private loginServiceUseCase: LoginServiceUseCase
  ) {}


  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // if (this.loginForm.invalid) {
    //   console.error('Email and password are required');
    //   return;
    // }
    const body: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.executeLogin(body);
    // this.navService.push('/welcome-step-one', 'fade');
  }

  forgotPassword() {

    // this.navService.navigate('/welcome', 'flip', 'forward');
  }

  goToRegister() {
    // this.navService.navigate('/welcome', 'curl', 'back');
  }

  private executeLogin(body: LoginRequest) {
    this.loginServiceUseCase.login(body)
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.navService.push('/welcome-step-one', 'fade');
          } else {
            console.error('Error en login:', result.message);
          }
        },
        error: (err) => {
          console.error('Error en la petición:', err);
        }
      });
  }

}
