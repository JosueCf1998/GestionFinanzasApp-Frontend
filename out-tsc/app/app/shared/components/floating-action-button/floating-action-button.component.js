import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
export class FloatingActionButtonComponent {
    constructor() {
        this.icon = 'add';
        this.ariaLabel = 'Agregar';
        this.disabled = false;
        this.clicked = new EventEmitter();
    }
    onClick() {
        if (!this.disabled)
            this.clicked.emit();
    }
    static { this.ɵfac = function FloatingActionButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FloatingActionButtonComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FloatingActionButtonComponent, selectors: [["app-floating-action-button"]], hostAttrs: ["slot", "fixed"], inputs: { icon: "icon", ariaLabel: "ariaLabel", disabled: "disabled" }, outputs: { clicked: "clicked" }, decls: 3, vars: 4, consts: [["vertical", "bottom", "horizontal", "end"], [3, "click", "disabled"], [3, "src"]], template: function FloatingActionButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-fab", 0)(1, "ion-fab-button", 1);
            i0.ɵɵlistener("click", function FloatingActionButtonComponent_Template_ion_fab_button_click_1_listener() { return ctx.onClick(); });
            i0.ɵɵelement(2, "ion-icon", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.disabled);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel)("title", ctx.ariaLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("src", "assets/icon/" + ctx.icon + ".svg");
        } }, dependencies: [IonFab, IonFabButton, IonIcon], styles: ["[_nghost-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  pointer-events: none;\n}\n\nion-fab[_ngcontent-%COMP%] {\n  right: 16px;\n  bottom: calc(16px + env(safe-area-inset-bottom, 0px));\n  margin: 0;\n  pointer-events: auto;\n}\n\nion-fab-button[_ngcontent-%COMP%] {\n  --background: var(--fv-gradient-primary);\n  --background-activated: var(--fv-primary);\n  --background-hover: var(--fv-primary);\n  --box-shadow: 0 12px 28px rgba(67, 97, 238, 0.28);\n\n  ion-icon {\n    width: 24px;\n    height: 24px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FloatingActionButtonComponent, [{
        type: Component,
        args: [{ selector: 'app-floating-action-button', standalone: true, imports: [IonFab, IonFabButton, IonIcon], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    slot: 'fixed'
                }, template: "<ion-fab vertical=\"bottom\" horizontal=\"end\">\n  <ion-fab-button\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.title]=\"ariaLabel\"\n    (click)=\"onClick()\">\n    <ion-icon [src]=\"'assets/icon/' + icon + '.svg'\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>\n", styles: [":host {\n  position: absolute;\n  z-index: 10;\n  inset: 0;\n  pointer-events: none;\n}\n\nion-fab {\n  right: 16px;\n  bottom: calc(16px + env(safe-area-inset-bottom, 0px));\n  margin: 0;\n  pointer-events: auto;\n}\n\nion-fab-button {\n  --background: var(--fv-gradient-primary);\n  --background-activated: var(--fv-primary);\n  --background-hover: var(--fv-primary);\n  --box-shadow: 0 12px 28px rgba(67, 97, 238, 0.28);\n\n  ion-icon {\n    width: 24px;\n    height: 24px;\n  }\n}\n"] }]
    }], null, { icon: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], disabled: [{
            type: Input
        }], clicked: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FloatingActionButtonComponent, { className: "FloatingActionButtonComponent", filePath: "src/app/shared/components/floating-action-button/floating-action-button.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=floating-action-button.component.js.map