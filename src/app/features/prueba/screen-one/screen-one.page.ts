import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-screen-one',
  templateUrl: './screen-one.page.html',
  styleUrls: ['./screen-one.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton]
})
export class ScreenOnePage {
  constructor(private navService: NavigationService) {}

  goToScreenTwo() {
    this.navService.push('/prueba/screen-two');
  }
}
