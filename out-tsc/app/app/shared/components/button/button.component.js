import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ionic/angular";
function ButtonComponent_ion_spinner_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-spinner", 3);
} }
function ButtonComponent_ng_container_2_ion_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 6);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", "assets/icon/" + ctx_r0.icon + ".svg");
} }
function ButtonComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ButtonComponent_ng_container_2_ion_icon_1_Template, 1, 1, "ion-icon", 4);
    i0.ɵɵelementStart(2, "span", 5);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.text, " ");
} }
export class ButtonComponent {
    constructor() {
        /* ==========================================================
         * TEXT
         * ========================================================== */
        this.text = '';
        /* ==========================================================
         * VARIANT
         * ========================================================== */
        this.variant = 'primary';
        /* ==========================================================
         * TYPE
         * ========================================================== */
        this.type = 'button';
        /* ==========================================================
         * SIZE
         * ========================================================== */
        this.size = 'default';
        /* ==========================================================
         * EXPAND
         * ========================================================== */
        this.expand = 'block';
        /* ==========================================================
         * STATE
         * ========================================================== */
        this.disabled = false;
        this.loading = false;
        /* ==========================================================
         * EVENT
         * ========================================================== */
        this.clicked = new EventEmitter();
    }
    /* ==========================================================
     * CLICK
     * ========================================================== */
    onClick() {
        if (this.disabled || this.loading) {
            return;
        }
        this.clicked.emit();
    }
    static { this.ɵfac = function ButtonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ButtonComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ButtonComponent, selectors: [["app-button"]], inputs: { text: "text", icon: "icon", variant: "variant", type: "type", size: "size", expand: "expand", disabled: "disabled", loading: "loading" }, outputs: { clicked: "clicked" }, decls: 3, vars: 19, consts: [["mode", "md", 1, "fv-button", 3, "click", "expand", "type", "disabled"], ["name", "crescent", 4, "ngIf"], [4, "ngIf"], ["name", "crescent"], ["class", "button-icon", 3, "src", 4, "ngIf"], [1, "button-label"], [1, "button-icon", 3, "src"]], template: function ButtonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-button", 0);
            i0.ɵɵlistener("click", function ButtonComponent_Template_ion_button_click_0_listener() { return ctx.onClick(); });
            i0.ɵɵtemplate(1, ButtonComponent_ion_spinner_1_Template, 1, 0, "ion-spinner", 1)(2, ButtonComponent_ng_container_2_Template, 4, 2, "ng-container", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("primary", ctx.variant === "primary")("secondary", ctx.variant === "secondary")("outline", ctx.variant === "outline")("ghost", ctx.variant === "ghost")("danger", ctx.variant === "danger")("compact", ctx.size === "compact")("auto", ctx.expand === "auto");
            i0.ɵɵproperty("expand", ctx.expand === "auto" ? undefined : ctx.expand)("type", ctx.type)("disabled", ctx.disabled || ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading);
        } }, dependencies: [CommonModule, i1.NgIf, IonicModule, i2.IonButton, i2.IonIcon, i2.IonSpinner], styles: ["\n\n\n\n\n.fv-button[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  width: 100%;\n  height: 56px;\n\n  --border-radius: 16px;\n\n  font-size: 16px;\n  font-weight: 700;\n\n  letter-spacing: -.01em;\n\n  text-transform: none;\n\n  transition:\n    transform .18s ease,\n    filter .18s ease,\n    box-shadow .18s ease,\n    color .18s ease;\n\n}\n\n.fv-button.auto[_ngcontent-%COMP%] {\n  width: auto;\n}\n\n.fv-button.compact[_ngcontent-%COMP%] {\n  height: 40px;\n  --border-radius: 12px;\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-semibold);\n}\n\n.fv-button.compact[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n\n\n\n\n\n\n.button-label[_ngcontent-%COMP%] {\n\n  white-space: nowrap;\n\n}\n\n.button-icon[_ngcontent-%COMP%] {\n\n  width: 20px;\n  height: 20px;\n  margin-inline-end: 8px;\n\n}\n\n\n\n\n\n\n.fv-button.primary[_ngcontent-%COMP%] {\n\n  --background: var(--fv-gradient-primary);\n  --background-hover: var(--fv-gradient-primary);\n  --background-focused: var(--fv-gradient-primary);\n  --background-activated: var(--fv-gradient-primary);\n\n  --color: #fff;\n\n  --box-shadow: var(--fv-shadow-primary);\n\n}\n\n.fv-button.primary[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], \n.fv-button.primary[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n\n  color: #fff;\n\n}\n\n\n\n\n\n\n.fv-button.secondary[_ngcontent-%COMP%] {\n\n  --background: rgba(67,97,238,.08);\n  --background-hover: rgba(67,97,238,.10);\n  --background-focused: rgba(67,97,238,.10);\n  --background-activated: rgba(67,97,238,.12);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n}\n\n.fv-button.secondary[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], \n.fv-button.secondary[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n\n  color: var(--fv-primary);\n\n}\n\n\n\n\n\n\n.fv-button.outline[_ngcontent-%COMP%] {\n\n  --background: transparent;\n  --background-hover: rgba(67,97,238,.04);\n  --background-focused: rgba(67,97,238,.04);\n  --background-activated: rgba(67,97,238,.08);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n  border: 1px solid rgba(67,97,238,.14);\n\n}\n\n.fv-button.outline[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], \n.fv-button.outline[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n\n  color: var(--fv-primary);\n\n}\n\n\n\n\n\n\n.fv-button.ghost[_ngcontent-%COMP%] {\n\n  --background: transparent;\n  --background-hover: rgba(67,97,238,.05);\n  --background-focused: rgba(67,97,238,.05);\n  --background-activated: rgba(67,97,238,.08);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n}\n\n.fv-button.ghost[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%], \n.fv-button.ghost[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n\n  color: var(--fv-primary);\n\n}\n\n\n\n\n\n\n.fv-button.danger[_ngcontent-%COMP%] {\n\n  height: 48px;\n\n  --background: transparent;\n  --background-hover: transparent;\n  --background-focused: transparent;\n  --background-activated: transparent;\n\n  --color: var(--fv-text-secondary);\n\n  --box-shadow: none;\n\n  font-size: 15px;\n  font-weight: 700;\n\n}\n\n.fv-button.danger[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%] {\n\n  color: var(--fv-text-secondary);\n\n}\n\n.fv-button.danger[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n\n  width: 18px;\n  height: 18px;\n\n  color: var(--fv-text-secondary);\n\n}\n\n.fv-button.danger[_ngcontent-%COMP%]:hover, \n.fv-button.danger[_ngcontent-%COMP%]:active {\n\n  --color: var(--fv-danger);\n\n}\n\n.fv-button.danger[_ngcontent-%COMP%]:hover   .button-label[_ngcontent-%COMP%], \n.fv-button.danger[_ngcontent-%COMP%]:hover   .button-icon[_ngcontent-%COMP%], \n.fv-button.danger[_ngcontent-%COMP%]:active   .button-label[_ngcontent-%COMP%], \n.fv-button.danger[_ngcontent-%COMP%]:active   .button-icon[_ngcontent-%COMP%] {\n\n  color: var(--fv-danger);\n\n}\n\n\n\n\n\n\n.fv-button[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n\n  width: 18px;\n  height: 18px;\n\n}\n\n.fv-button.primary[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n\n  color: #fff;\n\n}\n\n.fv-button.secondary[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%], \n.fv-button.outline[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%], \n.fv-button.ghost[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%], \n.fv-button.danger[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n\n  color: currentColor;\n\n}\n\n\n\n\n\n\n.fv-button[_ngcontent-%COMP%]::part(native):active {\n\n  transform: scale(.985);\n\n}\n\n\n\n\n\n\n.fv-button.button-disabled[_ngcontent-%COMP%] {\n\n  opacity: .55;\n  --opacity: 1;\n\n  --box-shadow: none;\n\n}\n\n\n\n\n\n\n@media (max-width:420px) {\n\n  .fv-button[_ngcontent-%COMP%] {\n\n    height: 54px;\n\n    font-size: 15px;\n\n  }\n\n  .fv-button.danger[_ngcontent-%COMP%] {\n\n    height: 46px;\n\n    font-size: 14px;\n\n  }\n\n  .button-icon[_ngcontent-%COMP%] {\n\n    width: 18px;\n    height: 18px;\n\n  }\n\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ButtonComponent, [{
        type: Component,
        args: [{ selector: 'app-button', standalone: true, imports: [
                    CommonModule,
                    IonicModule,
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- ==========================================================\n     BUTTON\n     ========================================================== -->\n\n<ion-button\n  mode=\"md\"\n  class=\"fv-button\"\n  [class.primary]=\"variant === 'primary'\"\n  [class.secondary]=\"variant === 'secondary'\"\n  [class.outline]=\"variant === 'outline'\"\n  [class.ghost]=\"variant === 'ghost'\"\n  [class.danger]=\"variant === 'danger'\"\n  [class.compact]=\"size === 'compact'\"\n  [class.auto]=\"expand === 'auto'\"\n  [expand]=\"expand === 'auto' ? undefined : expand\"\n  [type]=\"type\"\n  [disabled]=\"disabled || loading\"\n  (click)=\"onClick()\">\n\n  <!-- ========================================================\n       LOADING\n       ======================================================== -->\n\n  <ion-spinner\n    *ngIf=\"loading\"\n    name=\"crescent\">\n  </ion-spinner>\n\n  <!-- ========================================================\n       CONTENT\n       ======================================================== -->\n\n  <ng-container *ngIf=\"!loading\">\n\n    <ion-icon\n      *ngIf=\"icon\"\n      class=\"button-icon\"\n      [src]=\"'assets/icon/' + icon + '.svg'\">\n    </ion-icon>\n\n    <span class=\"button-label\">\n\n      {{ text }}\n\n    </span>\n\n  </ng-container>\n\n</ion-button>\n", styles: ["/* ==========================================================\n   BUTTON\n   ========================================================== */\n\n.fv-button {\n\n  margin: 0;\n\n  width: 100%;\n  height: 56px;\n\n  --border-radius: 16px;\n\n  font-size: 16px;\n  font-weight: 700;\n\n  letter-spacing: -.01em;\n\n  text-transform: none;\n\n  transition:\n    transform .18s ease,\n    filter .18s ease,\n    box-shadow .18s ease,\n    color .18s ease;\n\n}\n\n.fv-button.auto {\n  width: auto;\n}\n\n.fv-button.compact {\n  height: 40px;\n  --border-radius: 12px;\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-semibold);\n}\n\n.fv-button.compact .button-icon {\n  width: 17px;\n  height: 17px;\n}\n\n/* ==========================================================\n   CONTENT\n   ========================================================== */\n\n.button-label {\n\n  white-space: nowrap;\n\n}\n\n.button-icon {\n\n  width: 20px;\n  height: 20px;\n  margin-inline-end: 8px;\n\n}\n\n/* ==========================================================\n   PRIMARY\n   ========================================================== */\n\n.fv-button.primary {\n\n  --background: var(--fv-gradient-primary);\n  --background-hover: var(--fv-gradient-primary);\n  --background-focused: var(--fv-gradient-primary);\n  --background-activated: var(--fv-gradient-primary);\n\n  --color: #fff;\n\n  --box-shadow: var(--fv-shadow-primary);\n\n}\n\n.fv-button.primary .button-label,\n.fv-button.primary .button-icon {\n\n  color: #fff;\n\n}\n\n/* ==========================================================\n   SECONDARY\n   ========================================================== */\n\n.fv-button.secondary {\n\n  --background: rgba(67,97,238,.08);\n  --background-hover: rgba(67,97,238,.10);\n  --background-focused: rgba(67,97,238,.10);\n  --background-activated: rgba(67,97,238,.12);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n}\n\n.fv-button.secondary .button-label,\n.fv-button.secondary .button-icon {\n\n  color: var(--fv-primary);\n\n}\n\n/* ==========================================================\n   OUTLINE\n   ========================================================== */\n\n.fv-button.outline {\n\n  --background: transparent;\n  --background-hover: rgba(67,97,238,.04);\n  --background-focused: rgba(67,97,238,.04);\n  --background-activated: rgba(67,97,238,.08);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n  border: 1px solid rgba(67,97,238,.14);\n\n}\n\n.fv-button.outline .button-label,\n.fv-button.outline .button-icon {\n\n  color: var(--fv-primary);\n\n}\n\n/* ==========================================================\n   GHOST\n   ========================================================== */\n\n.fv-button.ghost {\n\n  --background: transparent;\n  --background-hover: rgba(67,97,238,.05);\n  --background-focused: rgba(67,97,238,.05);\n  --background-activated: rgba(67,97,238,.08);\n\n  --color: var(--fv-primary);\n\n  --box-shadow: none;\n\n}\n\n.fv-button.ghost .button-label,\n.fv-button.ghost .button-icon {\n\n  color: var(--fv-primary);\n\n}\n\n/* ==========================================================\n   DANGER\n   ========================================================== */\n\n.fv-button.danger {\n\n  height: 48px;\n\n  --background: transparent;\n  --background-hover: transparent;\n  --background-focused: transparent;\n  --background-activated: transparent;\n\n  --color: var(--fv-text-secondary);\n\n  --box-shadow: none;\n\n  font-size: 15px;\n  font-weight: 700;\n\n}\n\n.fv-button.danger .button-label {\n\n  color: var(--fv-text-secondary);\n\n}\n\n.fv-button.danger .button-icon {\n\n  width: 18px;\n  height: 18px;\n\n  color: var(--fv-text-secondary);\n\n}\n\n.fv-button.danger:hover,\n.fv-button.danger:active {\n\n  --color: var(--fv-danger);\n\n}\n\n.fv-button.danger:hover .button-label,\n.fv-button.danger:hover .button-icon,\n.fv-button.danger:active .button-label,\n.fv-button.danger:active .button-icon {\n\n  color: var(--fv-danger);\n\n}\n\n/* ==========================================================\n   SPINNER\n   ========================================================== */\n\n.fv-button ion-spinner {\n\n  width: 18px;\n  height: 18px;\n\n}\n\n.fv-button.primary ion-spinner {\n\n  color: #fff;\n\n}\n\n.fv-button.secondary ion-spinner,\n.fv-button.outline ion-spinner,\n.fv-button.ghost ion-spinner,\n.fv-button.danger ion-spinner {\n\n  color: currentColor;\n\n}\n\n/* ==========================================================\n   ACTIVE\n   ========================================================== */\n\n.fv-button::part(native):active {\n\n  transform: scale(.985);\n\n}\n\n/* ==========================================================\n   DISABLED\n   ========================================================== */\n\n.fv-button.button-disabled {\n\n  opacity: .55;\n  --opacity: 1;\n\n  --box-shadow: none;\n\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width:420px) {\n\n  .fv-button {\n\n    height: 54px;\n\n    font-size: 15px;\n\n  }\n\n  .fv-button.danger {\n\n    height: 46px;\n\n    font-size: 14px;\n\n  }\n\n  .button-icon {\n\n    width: 18px;\n    height: 18px;\n\n  }\n\n}\n"] }]
    }], null, { text: [{
            type: Input
        }], icon: [{
            type: Input
        }], variant: [{
            type: Input
        }], type: [{
            type: Input
        }], size: [{
            type: Input
        }], expand: [{
            type: Input
        }], disabled: [{
            type: Input
        }], loading: [{
            type: Input
        }], clicked: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "src/app/shared/components/button/button.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=button.component.js.map