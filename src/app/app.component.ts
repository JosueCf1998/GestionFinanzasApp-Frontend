import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CustomLoadingComponent } from "./shared/components/custom-loading/custom-loading.component";
import { DynamicAlertComponent } from './shared/components/basic-alert/basic-alert.component';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [
    IonApp,
    IonRouterOutlet,
    CustomLoadingComponent,
    DynamicAlertComponent
  ],
})
export class AppComponent {
  constructor() {}
}
