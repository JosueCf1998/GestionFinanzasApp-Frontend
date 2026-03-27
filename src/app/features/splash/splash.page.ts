import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.navigationService.replace('/login');
    }, 2500);
  }

}
