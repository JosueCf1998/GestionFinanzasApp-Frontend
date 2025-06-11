import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonImg, IonIcon, IonButton, IonText } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';


@Component({
  selector: 'app-welcome-step-one',
  templateUrl: './welcome-step-one.page.html',
  styleUrls: ['./welcome-step-one.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonIcon, IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WelcomeStepOnePage implements OnInit {

  constructor(
      private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  toNavigate() {
    this.navService.push('/welcome-step-two', 'fade');
  }
}
