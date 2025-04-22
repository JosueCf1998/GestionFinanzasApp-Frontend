import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { NavigationService } from '../navigation.service';
import { NavController } from '@ionic//angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

    constructor(
        private navService: NavigationService,
        private navController: NavController
      ) { }

    ngOnInit() {
    }

    goToNavigation() {
      // this.navController.navigateForward('/forgot-password')
      // this.navService.navigate('/forgot-password', 'slide');

      // this.navController.navigateForward('/forgot-password', {
      //   animationDirection: 'forward',
      //   state: { fromHome: true }
      // });

      this.navService.push('/forgot-password', 'fade');
    }

}
