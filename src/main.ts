import { bootstrapApplication } from "@angular/platform-browser";
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from "@angular/router";
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";
import { ApiService } from "./app/core/services/api.service";

import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { addIcons } from "ionicons";
import {
  addOutline,
  alertCircleOutline,
  callOutline,
  chevronForwardOutline,
  closeOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
  personCircleOutline,
  personOutline,
  shieldCheckmarkOutline,
  shieldOutline,
} from "ionicons/icons";

addIcons({
  addOutline,
  alertCircleOutline,
  callOutline,
  chevronForwardOutline,
  closeOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
  personCircleOutline,
  personOutline,
  shieldCheckmarkOutline,
  shieldOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});


