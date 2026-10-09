import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg, IonIcon, IonButton } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';


@Component({
  selector: 'app-welcome-step-one',
  templateUrl: './welcome-step-one.page.html',
  styleUrls: ['./welcome-step-one.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonImg, IonContent, CommonModule, FormsModule]
})
export class WelcomeStepOnePage implements OnInit {

  constructor(
      private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  toNavigate() {
    this.navService.push('/welcome-step-two');
  }
  
}
