import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonButton,
  IonIcon,
  IonSplitPane,
  IonMenu,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutUserUseCase } from '../../core/use-cases/users/logout-user.usecase';
import { NavigationService } from '../../core/services/navigation.service';
import { LocalManagementService } from '../../core/services/localManagementService.service';
import { ProfileUserRequest } from 'src/app/core/use-cases/users/profile-user.usecase';
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
  imports: [
    IonIcon,
    IonButton,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonSplitPane,
    IonMenu,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
    CommonModule,
    PageLayoutComponent
],
})
export class SideMenuPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public appPages = [
    { title: "Inicio", url: "/main/home", icon: "home" },
    { title: "Cuentas", url: "/main/accounts", icon: "money-bag" },
    { title: "Gráficos", url: "/main/graphics", icon: "chart" },
    { title: "Categorias", url: "/main/categories", icon: "category" },
  ];

  email: string = this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || "";
  name: string = this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";

  constructor(
    private logoutUserUseCase: LogoutUserUseCase,
    private navigationService: NavigationService,
    private localManagementService: LocalManagementService
  ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadUserData();
  }

  /**
   * Carga los datos del usuario desde localStorage
   * Este método se ejecuta UNA SOLA VEZ cuando se carga el layout /main
   */
  private loadUserData(): void {
  }

  logOut() {
    this.navigationService.replace('/splash');
  }
}
