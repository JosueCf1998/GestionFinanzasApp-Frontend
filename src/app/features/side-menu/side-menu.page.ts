import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonContent, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
  imports: [IonButton, RouterModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonContent],
})
export class SideMenuPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  
  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  logOut() {
    this.navService.push('/login', 'fade');
  }
  
}
