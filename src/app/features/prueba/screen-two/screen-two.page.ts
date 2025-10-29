import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.page.html',
  styleUrls: ['./screen-two.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton]
})
export class ScreenTwoPage {
  constructor(private navService: NavigationService) {}

  goToScreenThree() {
    this.navService.push('/prueba/screen-three');
  }

  goBack() {
    this.navService.back();
  }
}
