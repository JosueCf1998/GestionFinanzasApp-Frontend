import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/navigation.service";
export class ScreenOnePage {
    constructor(navService) {
        this.navService = navService;
    }
    goToScreenTwo() {
        this.navService.push('/prueba/screen-two');
    }
    static { this.ɵfac = function ScreenOnePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScreenOnePage)(i0.ɵɵdirectiveInject(i1.NavigationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ScreenOnePage, selectors: [["app-screen-one"]], decls: 12, vars: 0, consts: [["color", "primary"], [1, "screen-one"], [1, "content-center"], ["expand", "block", 1, "nav-button", 3, "click"]], template: function ScreenOnePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "ion-toolbar", 0)(2, "ion-title");
            i0.ɵɵtext(3, "Pantalla 1 - Azul");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(4, "ion-content", 1)(5, "div", 2)(6, "h1");
            i0.ɵɵtext(7, "Pantalla 1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9, "Esta es la primera pantalla (Azul)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "ion-button", 3);
            i0.ɵɵlistener("click", function ScreenOnePage_Template_ion_button_click_10_listener() { return ctx.goToScreenTwo(); });
            i0.ɵɵtext(11, " Ir a Pantalla 2 \u2192 ");
            i0.ɵɵelementEnd()()();
        } }, dependencies: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton], styles: [".screen-one[_ngcontent-%COMP%] {\n  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.content-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n\n  h1 {\n    color: white;\n    font-size: 48px;\n    font-weight: bold;\n    margin-bottom: 16px;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.9);\n    font-size: 18px;\n    margin-bottom: 32px;\n  }\n\n  .nav-button {\n    --background: rgba(255, 255, 255, 0.2);\n    --background-hover: rgba(255, 255, 255, 0.3);\n    --color: white;\n    font-weight: 600;\n    max-width: 300px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScreenOnePage, [{
        type: Component,
        args: [{ selector: 'app-screen-one', standalone: true, imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton], template: "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>Pantalla 1 - Azul</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"screen-one\">\n  <div class=\"content-center\">\n    <h1>Pantalla 1</h1>\n    <p>Esta es la primera pantalla (Azul)</p>\n    \n    <ion-button \n      expand=\"block\" \n      (click)=\"goToScreenTwo()\"\n      class=\"nav-button\"\n    >\n      Ir a Pantalla 2 \u2192\n    </ion-button>\n  </div>\n</ion-content>\n", styles: [".screen-one {\n  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}\n\n.content-center {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n\n  h1 {\n    color: white;\n    font-size: 48px;\n    font-weight: bold;\n    margin-bottom: 16px;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.9);\n    font-size: 18px;\n    margin-bottom: 32px;\n  }\n\n  .nav-button {\n    --background: rgba(255, 255, 255, 0.2);\n    --background-hover: rgba(255, 255, 255, 0.3);\n    --color: white;\n    font-weight: 600;\n    max-width: 300px;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ScreenOnePage, { className: "ScreenOnePage", filePath: "src/app/features/prueba/screen-one/screen-one.page.ts", lineNumber: 13 }); })();
//# sourceMappingURL=screen-one.page.js.map