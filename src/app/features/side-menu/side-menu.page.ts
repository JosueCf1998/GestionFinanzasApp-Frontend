import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IonIcon,
  IonHeader,
  IonMenuButton,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationService } from '../../core/services/navigation.service';
import { LocalManagementService } from '../../core/services/localManagementService.service';

import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    RouterModule,
    IonHeader,
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

  // =========================
  // ROUTE
  // =========================

  private activatedRoute = inject(ActivatedRoute);

  folder = '';

  // =========================
  // MENU DATA
  // =========================

  appPages = [
    { title: "Inicio", url: "/main/home", icon: "home" },
    { title: "Cuentas", url: "/main/accounts", icon: "money-bag" },
    { title: "Gráficos", url: "/main/graphics", icon: "chart" },
    { title: "Categorías", url: "/main/categories", icon: "category" },
    { title: "Presupuesto", url: "/main/budgets", icon: "wallet" },
    { title: "Transacciones", url: "/main/transactions", icon: "bills" },
    { title: "Aprender", url: "/main/learning", icon: "study" },
  ];

  // =========================
  // USER DATA
  // =========================

  email = '';
  name = '';

  constructor(
    private navigationService: NavigationService,
    private localManagementService: LocalManagementService
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadUserData();
  }

  private loadUserData(): void {
    this.email =
      this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || '';

    this.name =
      this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || '';
  }

  releaseMenuTriggerFocus(): void {
    this.getDeepActiveElement()?.blur();
  }

  // =========================
  // ACTIONS
  // =========================

  logOut() {
    this.navigationService.replace('/splash');
  }

  private getDeepActiveElement(): HTMLElement | null {
    let activeElement = document.activeElement;

    while (activeElement?.shadowRoot?.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }

    return activeElement instanceof HTMLElement ? activeElement : null;
  }
}
