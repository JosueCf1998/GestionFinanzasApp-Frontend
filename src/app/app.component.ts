import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CustomLoadingComponent } from "./shared/components/custom-loading/custom-loading.component";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [
    IonApp,
    IonRouterOutlet,
    CustomLoadingComponent
  ],
})
export class AppComponent {
  constructor() {}
}
