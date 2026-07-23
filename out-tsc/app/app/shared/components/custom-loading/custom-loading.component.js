// spinner.component.ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIf } from "@angular/common";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/spinnerService.service";
import * as i2 from "@angular/common";
function CustomLoadingComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
    i0.ɵɵelement(2, "img", 3);
    i0.ɵɵelementEnd()();
} }
export class CustomLoadingComponent {
    constructor(spinnerService) {
        this.spinnerService = spinnerService;
    }
    static { this.ɵfac = function CustomLoadingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomLoadingComponent)(i0.ɵɵdirectiveInject(i1.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomLoadingComponent, selectors: [["app-spinner"]], decls: 2, vars: 3, consts: [["class", "spinner-overlay", 4, "ngIf"], [1, "spinner-overlay"], [1, "loader-container"], ["src", "assets/image/logo.png", "alt", "FinVia", 1, "loader-logo"]], template: function CustomLoadingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CustomLoadingComponent_div_0_Template, 3, 0, "div", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx.spinnerService.loading$));
        } }, dependencies: [CommonModule, i2.NgIf, i2.AsyncPipe], styles: [".spinner-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n\n  inset: 0;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: rgba(15, 23, 42, .18);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  z-index: 99999;\n\n  animation: _ngcontent-%COMP%_overlay-fade .2s ease;\n}\n\n.loader-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.loader-logo[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 160px;\n\n  object-fit: contain;\n\n  animation: _ngcontent-%COMP%_logo-breathe 1.8s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_logo-breathe {\n\n  0% {\n    transform: scale(.92);\n    opacity: .85;\n  }\n\n  50% {\n    transform: scale(1.08);\n    opacity: 1;\n  }\n\n  100% {\n    transform: scale(.92);\n    opacity: .85;\n  }\n\n}\n\n@keyframes _ngcontent-%COMP%_overlay-fade {\n\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomLoadingComponent, [{
        type: Component,
        args: [{ selector: "app-spinner", standalone: true, imports: [CommonModule, NgIf], template: "<div\n  class=\"spinner-overlay\"\n  *ngIf=\"spinnerService.loading$ | async\">\n\n  <div class=\"loader-container\">\n\n    <img\n      class=\"loader-logo\"\n      src=\"assets/image/logo.png\"\n      alt=\"FinVia\">\n\n  </div>\n\n</div>\n", styles: [".spinner-overlay {\n  position: fixed;\n\n  inset: 0;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: rgba(15, 23, 42, .18);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  z-index: 99999;\n\n  animation: overlay-fade .2s ease;\n}\n\n.loader-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.loader-logo {\n  width: 160px;\n  height: 160px;\n\n  object-fit: contain;\n\n  animation: logo-breathe 1.8s ease-in-out infinite;\n}\n\n@keyframes logo-breathe {\n\n  0% {\n    transform: scale(.92);\n    opacity: .85;\n  }\n\n  50% {\n    transform: scale(1.08);\n    opacity: 1;\n  }\n\n  100% {\n    transform: scale(.92);\n    opacity: .85;\n  }\n\n}\n\n@keyframes overlay-fade {\n\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n\n}\n"] }]
    }], () => [{ type: i1.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomLoadingComponent, { className: "CustomLoadingComponent", filePath: "src/app/shared/components/custom-loading/custom-loading.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=custom-loading.component.js.map