import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonImg, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  isLoginRecurrent: boolean = this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) != null;

  constructor(
    private navService: NavigationService,
    private localManagementService: LocalManagementService
  ) {}

  ngOnInit() {
    let time = this.isLoginRecurrent ? 2500 : 1500;
    setTimeout(() => {
      if (this.isLoginRecurrent) {
        this.navService.replace('/login-recurrent');
      } else {
        this.navService.replace('/login');
      }
    }, time);
  }

}
