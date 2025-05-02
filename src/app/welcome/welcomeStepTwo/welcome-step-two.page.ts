import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonImg, IonIcon, IonButton, IonText } from '@ionic/angular/standalone';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-welcome-step-two',
  templateUrl: './welcome-step-two.page.html',
  styleUrls: ['./welcome-step-two.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonIcon, IonImg, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WelcomeStepTwoPage implements OnInit {

  depositedAmount: string = 'AA';

  constructor(
      private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  toNavigate() {
    this.navService.push('/main', 'fade');
  }
}
