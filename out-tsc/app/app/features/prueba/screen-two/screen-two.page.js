import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/navigation.service";
export class ScreenTwoPage {
    constructor(navService) {
        this.navService = navService;
    }
    goToScreenThree() {
        this.navService.push('/prueba/screen-three');
    }
    goBack() {
        this.navService.back();
    }
    static { this.ɵfac = function ScreenTwoPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScreenTwoPage)(i0.ɵɵdirectiveInject(i1.NavigationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ScreenTwoPage, selectors: [["app-screen-two"]], decls: 17, vars: 0, consts: [["color", "success"], ["slot", "start"], ["defaultHref", "/prueba/screen-one", 3, "click"], [1, "screen-two"], [1, "content-center"], [1, "button-group"], ["expand", "block", "fill", "outline", 1, "nav-button", 3, "click"], ["expand", "block", 1, "nav-button", 3, "click"]], template: function ScreenTwoPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "ion-toolbar", 0)(2, "ion-buttons", 1)(3, "ion-back-button", 2);
            i0.ɵɵlistener("click", function ScreenTwoPage_Template_ion_back_button_click_3_listener() { return ctx.goBack(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "ion-title");
            i0.ɵɵtext(5, "Pantalla 2 - Verde");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "ion-content", 3)(7, "div", 4)(8, "h1");
            i0.ɵɵtext(9, "Pantalla 2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11, "Esta es la segunda pantalla (Verde)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 5)(13, "ion-button", 6);
            i0.ɵɵlistener("click", function ScreenTwoPage_Template_ion_button_click_13_listener() { return ctx.goBack(); });
            i0.ɵɵtext(14, " \u2190 Volver a Pantalla 1 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "ion-button", 7);
            i0.ɵɵlistener("click", function ScreenTwoPage_Template_ion_button_click_15_listener() { return ctx.goToScreenThree(); });
            i0.ɵɵtext(16, " Ir a Pantalla 3 \u2192 ");
            i0.ɵɵelementEnd()()()();
        } }, dependencies: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton], styles: [".screen-two[_ngcontent-%COMP%] {\n  --background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);\n}\n\n.content-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n\n  h1 {\n    color: white;\n    font-size: 48px;\n    font-weight: bold;\n    margin-bottom: 16px;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.9);\n    font-size: 18px;\n    margin-bottom: 32px;\n  }\n\n  .button-group {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    width: 100%;\n    max-width: 300px;\n  }\n\n  .nav-button {\n    --background: rgba(255, 255, 255, 0.2);\n    --background-hover: rgba(255, 255, 255, 0.3);\n    --color: white;\n    --border-color: white;\n    font-weight: 600;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScreenTwoPage, [{
        type: Component,
        args: [{ selector: 'app-screen-two', standalone: true, imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonBackButton], template: "<ion-header>\n  <ion-toolbar color=\"success\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button (click)=\"goBack()\" defaultHref=\"/prueba/screen-one\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Pantalla 2 - Verde</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"screen-two\">\n  <div class=\"content-center\">\n    <h1>Pantalla 2</h1>\n    <p>Esta es la segunda pantalla (Verde)</p>\n    \n    <div class=\"button-group\">\n      <ion-button \n        expand=\"block\" \n        (click)=\"goBack()\"\n        fill=\"outline\"\n        class=\"nav-button\"\n      >\n        \u2190 Volver a Pantalla 1\n      </ion-button>\n      \n      <ion-button \n        expand=\"block\" \n        (click)=\"goToScreenThree()\"\n        class=\"nav-button\"\n      >\n        Ir a Pantalla 3 \u2192\n      </ion-button>\n    </div>\n  </div>\n</ion-content>\n", styles: [".screen-two {\n  --background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);\n}\n\n.content-center {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n\n  h1 {\n    color: white;\n    font-size: 48px;\n    font-weight: bold;\n    margin-bottom: 16px;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.9);\n    font-size: 18px;\n    margin-bottom: 32px;\n  }\n\n  .button-group {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    width: 100%;\n    max-width: 300px;\n  }\n\n  .nav-button {\n    --background: rgba(255, 255, 255, 0.2);\n    --background-hover: rgba(255, 255, 255, 0.3);\n    --color: white;\n    --border-color: white;\n    font-weight: 600;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ScreenTwoPage, { className: "ScreenTwoPage", filePath: "src/app/features/prueba/screen-two/screen-two.page.ts", lineNumber: 13 }); })();
//# sourceMappingURL=screen-two.page.js.map