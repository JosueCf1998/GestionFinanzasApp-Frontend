import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AccountDetailsModalComponent_article_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 4);
    i0.ɵɵelement(1, "app-item-icon", 5);
    i0.ɵɵelementStart(2, "div", 6)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6, "Saldo de la cuenta");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const account_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", account_r1.icon)("color", account_r1.color);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(account_r1.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(9, 4, account_r1.amount, ctx_r1.currency, "symbol-narrow", "1.2-2"));
} }
function AccountDetailsModalComponent_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " No hay cuentas vinculadas. ");
    i0.ɵɵelementEnd();
} }
export class AccountDetailsModalComponent {
    constructor() {
        this.isOpen = false;
        this.accounts = [];
        this.currency = 'PEN';
        this.closed = new EventEmitter();
    }
    trackByAccount(_, account) {
        return account.id;
    }
    static { this.ɵfac = function AccountDetailsModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountDetailsModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountDetailsModalComponent, selectors: [["app-account-details-modal"]], inputs: { isOpen: "isOpen", accounts: "accounts", currency: "currency" }, outputs: { closed: "closed" }, decls: 4, vars: 5, consts: [["title", "Cuentas vinculadas", "description", "Detalle de las cuentas asociadas a este presupuesto.", "size", "lg", 3, "closed", "isOpen", "backdropDismiss"], [1, "account-details"], ["class", "account-details__item", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "account-details__empty", 4, "ngIf"], [1, "account-details__item"], ["size", "md", "variant", "soft", 3, "icon", "color"], [1, "account-details__content"], [1, "account-details__empty"]], template: function AccountDetailsModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function AccountDetailsModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.closed.emit(); });
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵtemplate(2, AccountDetailsModalComponent_article_2_Template, 10, 9, "article", 2)(3, AccountDetailsModalComponent_p_3_Template, 2, 0, "p", 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.isOpen)("backdropDismiss", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.accounts)("ngForTrackBy", ctx.trackByAccount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.accounts.length);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, i1.CurrencyPipe, BaseModalComponent, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.account-details[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n  max-height: min(55vh, 430px);\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 6px;\n}\n\n.account-details__item[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border: 1px solid var(--fv-border);\n  border-radius: 16px;\n  background: var(--fv-surface);\n}\n\n.account-details__content[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 3px;\n}\n\n.account-details__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-semibold);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.account-details__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-caption-2);\n}\n\n.account-details__item[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-bold);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.account-details__empty[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-footnote);\n  text-align: center;\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountDetailsModalComponent, [{
        type: Component,
        args: [{ selector: 'app-account-details-modal', standalone: true, imports: [CommonModule, BaseModalComponent, ItemIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  title=\"Cuentas vinculadas\"\n  description=\"Detalle de las cuentas asociadas a este presupuesto.\"\n  size=\"lg\"\n  [backdropDismiss]=\"true\"\n  (closed)=\"closed.emit()\">\n  <div class=\"account-details\">\n    <article\n      *ngFor=\"let account of accounts; trackBy: trackByAccount\"\n      class=\"account-details__item\">\n      <app-item-icon\n        [icon]=\"account.icon\"\n        [color]=\"account.color\"\n        size=\"md\"\n        variant=\"soft\">\n      </app-item-icon>\n\n      <div class=\"account-details__content\">\n        <strong>{{ account.name }}</strong>\n        <small>Saldo de la cuenta</small>\n      </div>\n\n      <span>{{ account.amount | currency:currency:'symbol-narrow':'1.2-2' }}</span>\n    </article>\n\n    <p *ngIf=\"!accounts.length\" class=\"account-details__empty\">\n      No hay cuentas vinculadas.\n    </p>\n  </div>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.account-details {\n  display: flex;\n  min-height: 0;\n  max-height: min(55vh, 430px);\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 6px;\n}\n\n.account-details__item {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border: 1px solid var(--fv-border);\n  border-radius: 16px;\n  background: var(--fv-surface);\n}\n\n.account-details__content {\n  display: grid;\n  min-width: 0;\n  gap: 3px;\n}\n\n.account-details__content strong {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-semibold);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.account-details__content small {\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-caption-2);\n}\n\n.account-details__item > span {\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-bold);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.account-details__empty {\n  margin: 8px 0;\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-footnote);\n  text-align: center;\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], accounts: [{
            type: Input
        }], currency: [{
            type: Input
        }], closed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountDetailsModalComponent, { className: "AccountDetailsModalComponent", filePath: "src/app/shared/components/account-details-modal/account-details-modal.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=account-details-modal.component.js.map