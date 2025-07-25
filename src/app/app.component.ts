import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonTitle, IonToolbar, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { CustomLoadingComponent } from "./shared/components/custom-loading/custom-loading.component";
import { DynamicAlertComponent } from './shared/components/basic-alert/basic-alert.component';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [
    IonAvatar,
    IonToolbar,
    IonTitle,
    IonHeader,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    CommonModule,
    CustomLoadingComponent,
    DynamicAlertComponent
],
})
export class AppComponent {
  public appPages = [
    { title: "Inicio", url: "/main/home", icon: "home" },
    { title: "Cuentas", url: "/main/accounts", icon: "money-bag" },
    { title: "Gráficos", url: "/main/graphics", icon: "chart" },
    { title: "Categorias", url: "/main/categories", icon: "category" },
  ];
  public dataUser = {
    imagen: "https://gravatar.com/avatar/placeholder?s=200&d=mp",
    nombre: "Juan Pérez",
    correo: "juan.perez@gmail.com",
  };
  usuario: any;
  usuarioLogueado: boolean = false;

  ngOnInit(): void {
    this.usuarioLogueado = true;
    this.usuario = this.dataUser;
  }

  constructor() {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
    });
  }
}
