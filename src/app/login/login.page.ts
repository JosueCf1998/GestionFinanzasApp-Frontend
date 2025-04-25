import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonIcon, IonButton, IonLabel, IonItem, IonList, IonText } from '@ionic/angular/standalone';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonList, IonItem, IonLabel, IonButton, IonIcon, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  email: string = 'AA';
  password: string = 'AAA';
  showPassword: boolean = false;

  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Lógica de autenticación
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.navService.push('/welcome-step-one', 'fade');
  }

  forgotPassword() {

    // this.navService.navigate('/welcome', 'flip', 'forward');
  }

  goToRegister() {

    // this.navService.navigate('/welcome', 'curl', 'back');
  }
}
