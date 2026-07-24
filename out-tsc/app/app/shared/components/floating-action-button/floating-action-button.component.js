import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
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
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FloatingActionButtonComponent, selectors: [["app-floating-action-button"]], inputs: { icon: "icon", ariaLabel: "ariaLabel", disabled: "disabled" }, outputs: { clicked: "clicked" }, decls: 2, vars: 4, consts: [["type", "button", 1, "floating-action-button", 3, "click", "disabled"], [3, "src"]], template: function FloatingActionButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵlistener("click", function FloatingActionButtonComponent_Template_button_click_0_listener() { return ctx.onClick(); });
            i0.ɵɵelement(1, "ion-icon", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("disabled", ctx.disabled);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel)("title", ctx.ariaLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("src", "assets/icon/" + ctx.icon + ".svg");
        } }, dependencies: [IonIcon], styles: ["[_nghost-%COMP%] {\n  position: fixed;\n  right: 18px;\n  bottom: 36px;\n  z-index: 9999;\n  display: block;\n  width: 56px;\n  height: 56px;\n  pointer-events: none;\n}\n\n.floating-action-button[_ngcontent-%COMP%] {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  margin: 0;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, .22);\n  border-radius: 50%;\n  background: var(--fv-gradient-primary);\n  box-shadow:\n    0 14px 30px rgba(57, 48, 184, .3),\n    0 4px 10px rgba(57, 48, 184, .16),\n    inset 0 1px 0 rgba(255, 255, 255, .18);\n  color: #fff;\n  cursor: pointer;\n  pointer-events: auto;\n  place-items: center;\n  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;\n}\n\n.floating-action-button[_ngcontent-%COMP%]:active:not(:disabled) {\n  box-shadow:\n    0 8px 20px rgba(57, 48, 184, .26),\n    inset 0 1px 0 rgba(255, 255, 255, .15);\n  transform: scale(.94);\n}\n\n.floating-action-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(91, 70, 220, .22);\n  outline-offset: 3px;\n}\n\n.floating-action-button[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\nion-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FloatingActionButtonComponent, [{
        type: Component,
        args: [{ selector: 'app-floating-action-button', standalone: true, imports: [IonIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"floating-action-button\"\n  [disabled]=\"disabled\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.title]=\"ariaLabel\"\n  (click)=\"onClick()\">\n  <ion-icon [src]=\"'assets/icon/' + icon + '.svg'\"></ion-icon>\n</button>\n", styles: [":host {\n  position: fixed;\n  right: 18px;\n  bottom: 36px;\n  z-index: 9999;\n  display: block;\n  width: 56px;\n  height: 56px;\n  pointer-events: none;\n}\n\n.floating-action-button {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  margin: 0;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, .22);\n  border-radius: 50%;\n  background: var(--fv-gradient-primary);\n  box-shadow:\n    0 14px 30px rgba(57, 48, 184, .3),\n    0 4px 10px rgba(57, 48, 184, .16),\n    inset 0 1px 0 rgba(255, 255, 255, .18);\n  color: #fff;\n  cursor: pointer;\n  pointer-events: auto;\n  place-items: center;\n  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;\n}\n\n.floating-action-button:active:not(:disabled) {\n  box-shadow:\n    0 8px 20px rgba(57, 48, 184, .26),\n    inset 0 1px 0 rgba(255, 255, 255, .15);\n  transform: scale(.94);\n}\n\n.floating-action-button:focus-visible {\n  outline: 3px solid rgba(91, 70, 220, .22);\n  outline-offset: 3px;\n}\n\n.floating-action-button:disabled {\n  cursor: default;\n  opacity: .5;\n}\n\nion-icon {\n  width: 24px;\n  height: 24px;\n}\n"] }]
    }], null, { icon: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], disabled: [{
            type: Input
        }], clicked: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FloatingActionButtonComponent, { className: "FloatingActionButtonComponent", filePath: "src/app/shared/components/floating-action-button/floating-action-button.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=floating-action-button.component.js.map