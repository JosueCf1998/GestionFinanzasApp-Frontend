import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-screen-three',
  templateUrl: './screen-three.page.html',
  styleUrls: ['./screen-three.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton]
})
export class ScreenThreePage {
  constructor(private navService: NavigationService) {}

  goToScreenOne() {
    this.navService.replace('/prueba/screen-one');
  }

  goBack() {
    this.navService.back();
  }
}
