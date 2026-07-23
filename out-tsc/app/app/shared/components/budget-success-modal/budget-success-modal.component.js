import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BudgetSuccessModalComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Nota");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.note);
} }
export class BudgetSuccessModalComponent {
    constructor() {
        this.isOpen = false;
        this.mode = 'create';
        this.budgetName = '';
        this.budgetTotal = 0;
        this.dateRange = '';
        this.accountsLabel = '';
        this.categoriesLabel = '';
        this.note = '';
        this.viewBudgets = new EventEmitter();
        this.modalOpen = false;
        this.modalAnimated = true;
        this.shouldNavigate = false;
    }
    get modalTitle() {
        return this.mode === 'edit' ? 'Presupuesto actualizado' : 'Presupuesto creado';
    }
    get eyebrow() {
        return this.mode === 'edit' ? '¡Cambios guardados!' : '¡Presupuesto creado!';
    }
    ngOnChanges(changes) {
        if (changes['isOpen']) {
            this.modalOpen = this.isOpen;
            if (this.isOpen) {
                this.modalAnimated = true;
                this.shouldNavigate = false;
            }
        }
    }
    requestViewBudgets() {
        this.shouldNavigate = true;
        this.modalAnimated = false;
        this.modalOpen = false;
    }
    handleClosed() {
        if (!this.shouldNavigate)
            return;
        this.shouldNavigate = false;
        this.viewBudgets.emit();
    }
    static { this.ɵfac = function BudgetSuccessModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BudgetSuccessModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BudgetSuccessModalComponent, selectors: [["app-budget-success-modal"]], inputs: { isOpen: "isOpen", mode: "mode", budgetName: "budgetName", budgetTotal: "budgetTotal", dateRange: "dateRange", accountsLabel: "accountsLabel", categoriesLabel: "categoriesLabel", note: "note" }, outputs: { viewBudgets: "viewBudgets" }, features: [i0.ɵɵNgOnChangesFeature], decls: 31, vars: 17, consts: [["primaryText", "Ir a mis presupuestos", "size", "sm", 3, "closed", "primary", "isOpen", "title", "showHeader", "showClose", "backdropDismiss", "animated"], [1, "success-content"], ["aria-hidden", "true", 1, "success-icon"], ["src", "assets/icon/success-check.svg"], [1, "success-eyebrow"], [1, "receipt-details"], [1, "receipt-total"], [1, "receipt-value--names"], [4, "ngIf"], [1, "receipt-value--note"]], template: function BudgetSuccessModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function BudgetSuccessModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.handleClosed(); })("primary", function BudgetSuccessModalComponent_Template_app_base_modal_primary_0_listener() { return ctx.requestViewBudgets(); });
            i0.ɵɵelementStart(1, "section", 1)(2, "div", 2);
            i0.ɵɵelement(3, "ion-icon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h2");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "dl", 5)(9, "div")(10, "dt");
            i0.ɵɵtext(11, "Presupuesto total");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "dd", 6);
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div")(16, "dt");
            i0.ɵɵtext(17, "Programaci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "dd");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div")(21, "dt");
            i0.ɵɵtext(22, "Cuentas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "dd", 7);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div")(26, "dt");
            i0.ɵɵtext(27, "Categor\u00EDas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "dd", 7);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(30, BudgetSuccessModalComponent_div_30_Template, 5, 1, "div", 8);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.modalOpen)("title", ctx.modalTitle)("showHeader", false)("showClose", false)("backdropDismiss", false)("animated", ctx.modalAnimated);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", ctx.modalTitle + " correctamente");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.eyebrow);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.budgetName);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("S/ ", i0.ɵɵpipeBind2(14, 14, ctx.budgetTotal, "1.2-2"), "");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.dateRange);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.accountsLabel);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.categoriesLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.note);
        } }, dependencies: [CommonModule, i1.NgIf, i1.DecimalPipe, IonIcon, BaseModalComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.success-content[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 2px 0 4px;\n  text-align: center;\n}\n\n.success-icon[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 64px;\n  height: 64px;\n  margin: 2px 0 12px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 22%, var(--fv-surface));\n  border-radius: 50%;\n  background: var(--fv-success);\n  color: var(--fv-surface);\n  box-shadow:\n    0 0 0 8px color-mix(in srgb, var(--fv-success) 8%, transparent),\n    0 12px 26px color-mix(in srgb, var(--fv-success) 20%, transparent);\n  place-items: center;\n}\n\n.success-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n}\n\n.success-eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-success);\n  font-size: 12px;\n  font-weight: 700;\n}\n\nh2[_ngcontent-%COMP%] {\n  max-width: 280px;\n  margin: 7px 0 18px;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 750;\n  letter-spacing: -.02em;\n  line-height: 1.3;\n}\n\n.receipt-details[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--fv-primary) 8%, var(--fv-border));\n  border-radius: 16px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, var(--fv-surface));\n}\n\n.receipt-details[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 9px 14px;\n}\n\n.receipt-details[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\ndt[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  text-align: left;\n}\n\ndd[_ngcontent-%COMP%] {\n  max-width: 58%;\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 11.5px;\n  font-weight: 700;\n  line-height: 1.35;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.receipt-total[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n  font-size: 13px;\n}\n\n.receipt-value--names[_ngcontent-%COMP%] {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  white-space: normal;\n}\n\n.receipt-value--note[_ngcontent-%COMP%] {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-weight: 700;\n  text-align: right;\n  white-space: normal;\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BudgetSuccessModalComponent, [{
        type: Component,
        args: [{ selector: 'app-budget-success-modal', standalone: true, imports: [CommonModule, IonIcon, BaseModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-base-modal\n  [isOpen]=\"modalOpen\"\n  [title]=\"modalTitle\"\n  primaryText=\"Ir a mis presupuestos\"\n  [showHeader]=\"false\"\n  [showClose]=\"false\"\n  [backdropDismiss]=\"false\"\n  [animated]=\"modalAnimated\"\n  size=\"sm\"\n  (closed)=\"handleClosed()\"\n  (primary)=\"requestViewBudgets()\">\n  <section class=\"success-content\" [attr.aria-label]=\"modalTitle + ' correctamente'\">\n    <div class=\"success-icon\" aria-hidden=\"true\">\n      <ion-icon src=\"assets/icon/success-check.svg\"></ion-icon>\n    </div>\n\n    <p class=\"success-eyebrow\">{{ eyebrow }}</p>\n    <h2>{{ budgetName }}</h2>\n\n    <dl class=\"receipt-details\">\n      <div>\n        <dt>Presupuesto total</dt>\n        <dd class=\"receipt-total\">S/ {{ budgetTotal | number:'1.2-2' }}</dd>\n      </div>\n      <div>\n        <dt>Programaci\u00F3n</dt>\n        <dd>{{ dateRange }}</dd>\n      </div>\n      <div>\n        <dt>Cuentas</dt>\n        <dd class=\"receipt-value--names\">{{ accountsLabel }}</dd>\n      </div>\n      <div>\n        <dt>Categor\u00EDas</dt>\n        <dd class=\"receipt-value--names\">{{ categoriesLabel }}</dd>\n      </div>\n      <div *ngIf=\"note\">\n        <dt>Nota</dt>\n        <dd class=\"receipt-value--note\">{{ note }}</dd>\n      </div>\n    </dl>\n  </section>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.success-content {\n  display: grid;\n  justify-items: center;\n  padding: 2px 0 4px;\n  text-align: center;\n}\n\n.success-icon {\n  position: relative;\n  display: grid;\n  width: 64px;\n  height: 64px;\n  margin: 2px 0 12px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 22%, var(--fv-surface));\n  border-radius: 50%;\n  background: var(--fv-success);\n  color: var(--fv-surface);\n  box-shadow:\n    0 0 0 8px color-mix(in srgb, var(--fv-success) 8%, transparent),\n    0 12px 26px color-mix(in srgb, var(--fv-success) 20%, transparent);\n  place-items: center;\n}\n\n.success-icon ion-icon {\n  width: 48px;\n  height: 48px;\n}\n\n.success-eyebrow {\n  margin: 0;\n  color: var(--fv-success);\n  font-size: 12px;\n  font-weight: 700;\n}\n\nh2 {\n  max-width: 280px;\n  margin: 7px 0 18px;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 750;\n  letter-spacing: -.02em;\n  line-height: 1.3;\n}\n\n.receipt-details {\n  width: 100%;\n  margin: 0;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--fv-primary) 8%, var(--fv-border));\n  border-radius: 16px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, var(--fv-surface));\n}\n\n.receipt-details > div {\n  display: flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 9px 14px;\n}\n\n.receipt-details > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\ndt {\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  text-align: left;\n}\n\ndd {\n  max-width: 58%;\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 11.5px;\n  font-weight: 700;\n  line-height: 1.35;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.receipt-total {\n  color: var(--fv-primary);\n  font-size: 13px;\n}\n\n.receipt-value--names {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  white-space: normal;\n}\n\n.receipt-value--note {\n  overflow: visible;\n  overflow-wrap: anywhere;\n  color: var(--fv-text-primary);\n  font-weight: 700;\n  text-align: right;\n  white-space: normal;\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], mode: [{
            type: Input
        }], budgetName: [{
            type: Input
        }], budgetTotal: [{
            type: Input
        }], dateRange: [{
            type: Input
        }], accountsLabel: [{
            type: Input
        }], categoriesLabel: [{
            type: Input
        }], note: [{
            type: Input
        }], viewBudgets: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BudgetSuccessModalComponent, { className: "BudgetSuccessModalComponent", filePath: "src/app/shared/components/budget-success-modal/budget-success-modal.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=budget-success-modal.component.js.map