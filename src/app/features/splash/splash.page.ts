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

  isFirstLogin: boolean = false;

  constructor(
    private navService: NavigationService
  ) {
    const state = window.history.state;
    if (!state || !state.type ) {
      this.isFirstLogin = true;
      return;
    }
    this.isFirstLogin = state.type === 'first-login';
  }

  ngOnInit() {
    let time = !this.isFirstLogin ? 2500 : 1500;
    setTimeout(() => {
      if (this.isFirstLogin) {
        this.navService.replace('/login');
      } else {
        this.navService.replace('/login-recurrent');
      }
    }, time);
  }

}
