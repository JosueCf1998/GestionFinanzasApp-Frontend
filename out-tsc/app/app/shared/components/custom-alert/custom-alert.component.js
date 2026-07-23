import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function CustomAlertComponent_ion_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.imageUrl);
    i0.ɵɵattribute("aria-label", ctx_r1.imageAlt);
} }
function CustomAlertComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 6);
    i0.ɵɵelement(1, "circle", 7)(2, "line", 8)(3, "line", 9);
    i0.ɵɵelementEnd();
} }
export class CustomAlertComponent {
    constructor() {
        this.header = 'Confirmar';
        this.message = '';
        this.cancelText = '';
        this.confirmText = '';
        this.imageUrl = '';
        this.imageAlt = 'Icono de alerta';
        this.showCancel = true;
        this.showConfirm = true;
        this.reverseButtons = false;
        this.alertSize = null;
        this.closeOnBackdrop = null;
        this.onCancel = new EventEmitter();
        this.onConfirm = new EventEmitter();
        this.isOpen = true;
        this.pendingAction = null;
    }
    get modalSize() {
        if (this.alertSize === 'medium')
            return 'md';
        if (this.alertSize === 'large')
            return 'lg';
        return 'sm';
    }
    get canDismissFromBackdrop() {
        return this.closeOnBackdrop ?? Boolean(this.showCancel && this.cancelText);
    }
    requestCancel() {
        this.pendingAction = 'cancel';
        this.isOpen = false;
    }
    requestConfirm() {
        this.pendingAction = 'confirm';
        this.isOpen = false;
    }
    handleClosed() {
        const action = this.pendingAction ?? 'cancel';
        this.pendingAction = null;
        if (action === 'confirm') {
            this.onConfirm.emit();
            return;
        }
        this.onCancel.emit();
    }
    static { this.ɵfac = function CustomAlertComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomAlertComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomAlertComponent, selectors: [["app-custom-alert"]], inputs: { header: "header", message: "message", cancelText: "cancelText", confirmText: "confirmText", imageUrl: "imageUrl", imageAlt: "imageAlt", showCancel: "showCancel", showConfirm: "showConfirm", reverseButtons: "reverseButtons", alertSize: "alertSize", closeOnBackdrop: "closeOnBackdrop" }, outputs: { onCancel: "onCancel", onConfirm: "onConfirm" }, decls: 10, vars: 14, consts: [["defaultAlertIcon", ""], [3, "closed", "primary", "secondary", "isOpen", "title", "description", "primaryText", "secondaryText", "backdropDismiss", "reverseActions", "showHeader", "showClose", "size"], [1, "custom-alert__content"], [1, "custom-alert__icon"], [3, "src", 4, "ngIf", "ngIfElse"], [3, "src"], ["aria-hidden", "true", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12.01", "y2", "8"], ["x1", "12", "y1", "12", "x2", "12", "y2", "16"]], template: function CustomAlertComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "app-base-modal", 1);
            i0.ɵɵlistener("closed", function CustomAlertComponent_Template_app_base_modal_closed_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.handleClosed()); })("primary", function CustomAlertComponent_Template_app_base_modal_primary_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.requestConfirm()); })("secondary", function CustomAlertComponent_Template_app_base_modal_secondary_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.requestCancel()); });
            i0.ɵɵelementStart(1, "div", 2)(2, "div", 3);
            i0.ɵɵtemplate(3, CustomAlertComponent_ion_icon_3_Template, 1, 2, "ion-icon", 4)(4, CustomAlertComponent_ng_template_4_Template, 4, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h2");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const defaultAlertIcon_r3 = i0.ɵɵreference(5);
            i0.ɵɵproperty("isOpen", ctx.isOpen)("title", ctx.header)("description", ctx.message)("primaryText", ctx.showConfirm ? ctx.confirmText : "")("secondaryText", ctx.showCancel ? ctx.cancelText : "")("backdropDismiss", ctx.canDismissFromBackdrop)("reverseActions", ctx.reverseButtons)("showHeader", false)("showClose", false)("size", ctx.modalSize);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.imageUrl)("ngIfElse", defaultAlertIcon_r3);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.header);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message);
        } }, dependencies: [CommonModule, i1.NgIf, BaseModalComponent, IonIcon], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.custom-alert__content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 6px 8px;\n  flex-direction: column;\n  text-align: center;\n}\n\n.custom-alert__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  margin-bottom: 17px;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 18px;\n  background: var(\n    --fv-gradient-primary,\n    linear-gradient(135deg, #3a0ca3, #4361ee)\n  );\n  color: #fff;\n  box-shadow: var(--fv-shadow-primary, 0 10px 24px rgba(58, 12, 163, .22));\n  place-items: center;\n}\n\n.custom-alert__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.custom-alert__icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n}\n\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-primary, #252b38);\n  font-size: 20px;\n  font-weight: 750;\n  letter-spacing: -.025em;\n  line-height: 1.25;\n}\n\np[_ngcontent-%COMP%] {\n  max-width: 280px;\n  margin: 10px 0 0;\n  color: var(--fv-text-secondary, #667085);\n  font-size: 13.5px;\n  line-height: 1.55;\n}\n\n@media (max-width: 380px) {\n  .custom-alert__content[_ngcontent-%COMP%] {\n    padding-top: 9px;\n  }\n\n  .custom-alert__icon[_ngcontent-%COMP%] {\n    width: 52px;\n    height: 52px;\n    margin-bottom: 15px;\n  }\n\n  h2[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomAlertComponent, [{
        type: Component,
        args: [{ selector: 'app-custom-alert', standalone: true, imports: [CommonModule, BaseModalComponent, IonIcon], template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  [title]=\"header\"\n  [description]=\"message\"\n  [primaryText]=\"showConfirm ? confirmText : ''\"\n  [secondaryText]=\"showCancel ? cancelText : ''\"\n  [backdropDismiss]=\"canDismissFromBackdrop\"\n  [reverseActions]=\"reverseButtons\"\n  [showHeader]=\"false\"\n  [showClose]=\"false\"\n  [size]=\"modalSize\"\n  (closed)=\"handleClosed()\"\n  (primary)=\"requestConfirm()\"\n  (secondary)=\"requestCancel()\">\n  <div class=\"custom-alert__content\">\n    <div class=\"custom-alert__icon\">\n      <ion-icon\n        *ngIf=\"imageUrl; else defaultAlertIcon\"\n        [src]=\"imageUrl\"\n        [attr.aria-label]=\"imageAlt\">\n      </ion-icon>\n\n      <ng-template #defaultAlertIcon>\n      <svg\n        aria-hidden=\"true\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        stroke=\"currentColor\"\n        stroke-width=\"2\"\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\">\n        <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n        <line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>\n        <line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"16\"></line>\n      </svg>\n      </ng-template>\n    </div>\n\n    <h2>{{ header }}</h2>\n    <p>{{ message }}</p>\n  </div>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.custom-alert__content {\n  display: flex;\n  align-items: center;\n  padding: 12px 6px 8px;\n  flex-direction: column;\n  text-align: center;\n}\n\n.custom-alert__icon {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  margin-bottom: 17px;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 18px;\n  background: var(\n    --fv-gradient-primary,\n    linear-gradient(135deg, #3a0ca3, #4361ee)\n  );\n  color: #fff;\n  box-shadow: var(--fv-shadow-primary, 0 10px 24px rgba(58, 12, 163, .22));\n  place-items: center;\n}\n\n.custom-alert__icon svg,\n.custom-alert__icon ion-icon {\n  width: 28px;\n  height: 28px;\n}\n\nh2 {\n  margin: 0;\n  color: var(--fv-text-primary, #252b38);\n  font-size: 20px;\n  font-weight: 750;\n  letter-spacing: -.025em;\n  line-height: 1.25;\n}\n\np {\n  max-width: 280px;\n  margin: 10px 0 0;\n  color: var(--fv-text-secondary, #667085);\n  font-size: 13.5px;\n  line-height: 1.55;\n}\n\n@media (max-width: 380px) {\n  .custom-alert__content {\n    padding-top: 9px;\n  }\n\n  .custom-alert__icon {\n    width: 52px;\n    height: 52px;\n    margin-bottom: 15px;\n  }\n\n  h2 {\n    font-size: 19px;\n  }\n}\n"] }]
    }], null, { header: [{
            type: Input
        }], message: [{
            type: Input
        }], cancelText: [{
            type: Input
        }], confirmText: [{
            type: Input
        }], imageUrl: [{
            type: Input
        }], imageAlt: [{
            type: Input
        }], showCancel: [{
            type: Input
        }], showConfirm: [{
            type: Input
        }], reverseButtons: [{
            type: Input
        }], alertSize: [{
            type: Input
        }], closeOnBackdrop: [{
            type: Input
        }], onCancel: [{
            type: Output
        }], onConfirm: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomAlertComponent, { className: "CustomAlertComponent", filePath: "src/app/shared/components/custom-alert/custom-alert.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=custom-alert.component.js.map