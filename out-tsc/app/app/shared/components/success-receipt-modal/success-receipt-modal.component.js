import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SuccessReceiptModalComponent_h2_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.heading);
} }
function SuccessReceiptModalComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const detail_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(detail_r2.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("receipt-value--emphasis", detail_r2.emphasis)("receipt-value--wrap", detail_r2.wrap);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", detail_r2.value, " ");
} }
export class SuccessReceiptModalComponent {
    constructor() {
        this.isOpen = false;
        this.title = 'Operación realizada';
        this.eyebrow = '¡Operación exitosa!';
        this.heading = '';
        this.actionText = 'Continuar';
        this.details = [];
        this.completed = new EventEmitter();
        this.modalOpen = false;
        this.modalAnimated = true;
        this.shouldComplete = false;
    }
    ngOnChanges(changes) {
        if (!changes['isOpen'])
            return;
        this.modalOpen = this.isOpen;
        if (this.isOpen) {
            this.modalAnimated = true;
            this.shouldComplete = false;
        }
    }
    requestCompletion() {
        this.shouldComplete = true;
        this.modalAnimated = false;
        this.modalOpen = false;
    }
    handleClosed() {
        if (!this.shouldComplete)
            return;
        this.shouldComplete = false;
        this.completed.emit();
    }
    static { this.ɵfac = function SuccessReceiptModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SuccessReceiptModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SuccessReceiptModalComponent, selectors: [["app-success-receipt-modal"]], inputs: { isOpen: "isOpen", title: "title", eyebrow: "eyebrow", heading: "heading", actionText: "actionText", details: "details" }, outputs: { completed: "completed" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 11, consts: [["size", "sm", 3, "closed", "primary", "isOpen", "title", "primaryText", "showHeader", "showClose", "backdropDismiss", "animated"], [1, "success-content"], ["aria-hidden", "true", 1, "success-icon"], ["src", "assets/icon/success-check.svg"], [1, "success-eyebrow"], [4, "ngIf"], [1, "receipt-details"], [4, "ngFor", "ngForOf"]], template: function SuccessReceiptModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function SuccessReceiptModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.handleClosed(); })("primary", function SuccessReceiptModalComponent_Template_app_base_modal_primary_0_listener() { return ctx.requestCompletion(); });
            i0.ɵɵelementStart(1, "section", 1)(2, "div", 2);
            i0.ɵɵelement(3, "ion-icon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, SuccessReceiptModalComponent_h2_6_Template, 2, 1, "h2", 5);
            i0.ɵɵelementStart(7, "dl", 6);
            i0.ɵɵtemplate(8, SuccessReceiptModalComponent_div_8_Template, 5, 6, "div", 7);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.modalOpen)("title", ctx.title)("primaryText", ctx.actionText)("showHeader", false)("showClose", false)("backdropDismiss", false)("animated", ctx.modalAnimated);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", ctx.title);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.eyebrow);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.heading);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.details);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IonIcon, BaseModalComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.success-content[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 2px 0 4px;\n  text-align: center;\n}\n\n.success-icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 64px;\n  height: 64px;\n  margin: 2px 0 12px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 22%, var(--fv-surface));\n  border-radius: 50%;\n  background: var(--fv-success);\n  color: var(--fv-surface);\n  box-shadow:\n    0 0 0 8px color-mix(in srgb, var(--fv-success) 8%, transparent),\n    0 12px 26px color-mix(in srgb, var(--fv-success) 20%, transparent);\n  place-items: center;\n}\n\n.success-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n}\n\n.success-eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-success);\n  font-size: 12px;\n  font-weight: 700;\n}\n\nh2[_ngcontent-%COMP%] {\n  max-width: 280px;\n  margin: 7px 0 18px;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 750;\n  letter-spacing: -.02em;\n  line-height: 1.3;\n}\n\n.receipt-details[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 18px 0 0;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--fv-primary) 8%, var(--fv-border));\n  border-radius: 16px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, var(--fv-surface));\n}\n\nh2[_ngcontent-%COMP%]    + .receipt-details[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.receipt-details[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 9px 14px;\n}\n\n.receipt-details[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\ndt[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  text-align: left;\n}\n\ndd[_ngcontent-%COMP%] {\n  max-width: 62%;\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 11.5px;\n  font-weight: 700;\n  line-height: 1.35;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.receipt-value--emphasis[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n  font-size: 13px;\n}\n\n.receipt-value--wrap[_ngcontent-%COMP%] {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  white-space: normal;\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SuccessReceiptModalComponent, [{
        type: Component,
        args: [{ selector: 'app-success-receipt-modal', standalone: true, imports: [CommonModule, IonIcon, BaseModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-base-modal\n  [isOpen]=\"modalOpen\"\n  [title]=\"title\"\n  [primaryText]=\"actionText\"\n  [showHeader]=\"false\"\n  [showClose]=\"false\"\n  [backdropDismiss]=\"false\"\n  [animated]=\"modalAnimated\"\n  size=\"sm\"\n  (closed)=\"handleClosed()\"\n  (primary)=\"requestCompletion()\">\n  <section class=\"success-content\" [attr.aria-label]=\"title\">\n    <div class=\"success-icon\" aria-hidden=\"true\">\n      <ion-icon src=\"assets/icon/success-check.svg\"></ion-icon>\n    </div>\n\n    <p class=\"success-eyebrow\">{{ eyebrow }}</p>\n    <h2 *ngIf=\"heading\">{{ heading }}</h2>\n\n    <dl class=\"receipt-details\">\n      <div *ngFor=\"let detail of details\">\n        <dt>{{ detail.label }}</dt>\n        <dd\n          [class.receipt-value--emphasis]=\"detail.emphasis\"\n          [class.receipt-value--wrap]=\"detail.wrap\">\n          {{ detail.value }}\n        </dd>\n      </div>\n    </dl>\n  </section>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.success-content {\n  display: grid;\n  justify-items: center;\n  padding: 2px 0 4px;\n  text-align: center;\n}\n\n.success-icon {\n  display: grid;\n  width: 64px;\n  height: 64px;\n  margin: 2px 0 12px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 22%, var(--fv-surface));\n  border-radius: 50%;\n  background: var(--fv-success);\n  color: var(--fv-surface);\n  box-shadow:\n    0 0 0 8px color-mix(in srgb, var(--fv-success) 8%, transparent),\n    0 12px 26px color-mix(in srgb, var(--fv-success) 20%, transparent);\n  place-items: center;\n}\n\n.success-icon ion-icon {\n  width: 48px;\n  height: 48px;\n}\n\n.success-eyebrow {\n  margin: 0;\n  color: var(--fv-success);\n  font-size: 12px;\n  font-weight: 700;\n}\n\nh2 {\n  max-width: 280px;\n  margin: 7px 0 18px;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 750;\n  letter-spacing: -.02em;\n  line-height: 1.3;\n}\n\n.receipt-details {\n  width: 100%;\n  margin: 18px 0 0;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--fv-primary) 8%, var(--fv-border));\n  border-radius: 16px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, var(--fv-surface));\n}\n\nh2 + .receipt-details {\n  margin-top: 0;\n}\n\n.receipt-details > div {\n  display: flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 9px 14px;\n}\n\n.receipt-details > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\ndt {\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  text-align: left;\n}\n\ndd {\n  max-width: 62%;\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 11.5px;\n  font-weight: 700;\n  line-height: 1.35;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.receipt-value--emphasis {\n  color: var(--fv-primary);\n  font-size: 13px;\n}\n\n.receipt-value--wrap {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  white-space: normal;\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], title: [{
            type: Input
        }], eyebrow: [{
            type: Input
        }], heading: [{
            type: Input
        }], actionText: [{
            type: Input
        }], details: [{
            type: Input
        }], completed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SuccessReceiptModalComponent, { className: "SuccessReceiptModalComponent", filePath: "src/app/shared/components/success-receipt-modal/success-receipt-modal.component.ts", lineNumber: 29 }); })();
//# sourceMappingURL=success-receipt-modal.component.js.map