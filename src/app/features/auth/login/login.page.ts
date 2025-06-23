import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Importamos el módulo ReactiveFormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonIcon, IonButton, IonLabel, IonItem, IonList, IonText, IonInput } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';
import { EncryptionService } from '../../../core/services/encryption.service';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonText, IonList, IonItem, IonLabel, IonButton, IonIcon, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule] // Agregamos el módulo ReactiveFormsModule a la lista de imports
})
export class LoginPage implements OnInit {

  // email: string = '';
  // password: string = '';
  showPassword: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(
    private navService: NavigationService,
    private encryptionService: EncryptionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Lógica de autenticación
    console.log('Email:', this.loginForm.value.email);
    console.log('Password:', this.loginForm.value.password);
    const correo = this.loginForm.value.email;
    const contraseña = this.loginForm.value.password;
    const datos = correo + ':' + contraseña;
    const encryptedData = this.encryptionService.encrypt(datos);
    console.log('Datos cifrados:', encryptedData);
    const decryptedData = this.encryptionService.decrypt(encryptedData);
    console.log("Datos descifrados:", decryptedData);

    this.navService.push('/welcome-step-one', 'fade');
  }

  forgotPassword() {

    // this.navService.navigate('/welcome', 'flip', 'forward');
  }

  goToRegister() {

    // this.navService.navigate('/welcome', 'curl', 'back');
  }
}
