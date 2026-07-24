import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TransactionCardComponent {
    constructor() {
        this.currencySymbol = 'S/';
        this.interactive = false;
        this.ariaLabel = '';
        this.selected = new EventEmitter();
    }
    get title() {
        return this.transaction.description?.trim() || this.transaction.category.name;
    }
    get sign() {
        return this.transaction.type === 'gasto' ? '−' : '+';
    }
    activate() {
        if (this.interactive)
            this.selected.emit(this.transaction);
    }
    static { this.ɵfac = function TransactionCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionCardComponent, selectors: [["app-transaction-card"]], inputs: { transaction: "transaction", currencySymbol: "currencySymbol", interactive: "interactive", ariaLabel: "ariaLabel" }, outputs: { selected: "selected" }, decls: 11, vars: 19, consts: [["type", "button", 1, "transaction-card", 3, "click", "disabled"], ["size", "sm", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], [1, "transaction-card__content"], [1, "transaction-card__amount"], ["src", "assets/icon/right-inline.svg", "alt", "", "aria-hidden", "true", 1, "transaction-card__chevron"]], template: function TransactionCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵlistener("click", function TransactionCardComponent_Template_button_click_0_listener() { return ctx.activate(); });
            i0.ɵɵelement(1, "app-item-icon", 1);
            i0.ɵɵelementStart(2, "span", 2)(3, "strong");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "small");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "strong", 3);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(10, "img", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--transaction-color", ctx.transaction.category.color);
            i0.ɵɵclassProp("transaction-card--income", ctx.transaction.type === "ingreso")("transaction-card--interactive", ctx.interactive);
            i0.ɵɵproperty("disabled", !ctx.interactive);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel || null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("icon", ctx.transaction.category.icon)("color", ctx.transaction.category.color);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.transaction.account.name, " \u00B7 ", ctx.transaction.category.name, "");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3(" ", ctx.sign, " ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(9, 16, ctx.transaction.amount, "1.2-2"), " ");
        } }, dependencies: [CommonModule, i1.DecimalPipe, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n\n.transaction-card[_ngcontent-%COMP%] {\n  --transaction-color: var(--fv-primary);\n  display: grid;\n  width: 100%;\n  min-height: 72px;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.transaction-card[_ngcontent-%COMP%]:disabled {\n  opacity: 1;\n}\n\n.transaction-card--interactive[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.transaction-card--interactive[_ngcontent-%COMP%]:active {\n  border-color: color-mix(in srgb, var(--transaction-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\napp-item-icon[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--transaction-color) 12%, transparent));\n}\n\n.transaction-card__content[_ngcontent-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n\n.transaction-card__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transaction-card__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-card__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n}\n\n.transaction-card__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  color: #858b9d;\n  font-size: 10px;\n}\n\n.transaction-card__amount[_ngcontent-%COMP%] {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n  white-space: nowrap;\n}\n\n.transaction-card--income[_ngcontent-%COMP%]   .transaction-card__amount[_ngcontent-%COMP%] {\n  color: var(--fv-success);\n}\n\n.transaction-card__chevron[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n@media (max-width: 380px) {\n  .transaction-card[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .transaction-card__amount[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionCardComponent, [{
        type: Component,
        args: [{ selector: 'app-transaction-card', standalone: true, imports: [CommonModule, ItemIconComponent], template: "<button\n  type=\"button\"\n  class=\"transaction-card\"\n  [class.transaction-card--income]=\"transaction.type === 'ingreso'\"\n  [class.transaction-card--interactive]=\"interactive\"\n  [style.--transaction-color]=\"transaction.category.color\"\n  [disabled]=\"!interactive\"\n  [attr.aria-label]=\"ariaLabel || null\"\n  (click)=\"activate()\">\n  <app-item-icon\n    [icon]=\"transaction.category.icon\"\n    [color]=\"transaction.category.color\"\n    size=\"sm\"\n    variant=\"soft\"\n    aria-hidden=\"true\">\n  </app-item-icon>\n\n  <span class=\"transaction-card__content\">\n    <strong>{{ title }}</strong>\n    <small>{{ transaction.account.name }} \u00B7 {{ transaction.category.name }}</small>\n  </span>\n\n  <strong class=\"transaction-card__amount\">\n    {{ sign }} {{ currencySymbol }} {{ transaction.amount | number:'1.2-2' }}\n  </strong>\n\n  <img\n    class=\"transaction-card__chevron\"\n    src=\"assets/icon/right-inline.svg\"\n    alt=\"\"\n    aria-hidden=\"true\">\n</button>\n", styles: [":host {\n  display: block;\n  min-width: 0;\n}\n\n.transaction-card {\n  --transaction-color: var(--fv-primary);\n  display: grid;\n  width: 100%;\n  min-height: 72px;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.transaction-card:disabled {\n  opacity: 1;\n}\n\n.transaction-card--interactive {\n  cursor: pointer;\n}\n\n.transaction-card--interactive:active {\n  border-color: color-mix(in srgb, var(--transaction-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\napp-item-icon {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--transaction-color) 12%, transparent));\n}\n\n.transaction-card__content {\n  display: block;\n  min-width: 0;\n}\n\n.transaction-card__content strong,\n.transaction-card__content small {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-card__content strong {\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n}\n\n.transaction-card__content small {\n  margin-top: 3px;\n  color: #858b9d;\n  font-size: 10px;\n}\n\n.transaction-card__amount {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n  white-space: nowrap;\n}\n\n.transaction-card--income .transaction-card__amount {\n  color: var(--fv-success);\n}\n\n.transaction-card__chevron {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n@media (max-width: 380px) {\n  .transaction-card {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .transaction-card__amount {\n    font-size: 10.5px;\n  }\n}\n"] }]
    }], null, { transaction: [{
            type: Input,
            args: [{ required: true }]
        }], currencySymbol: [{
            type: Input
        }], interactive: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], selected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionCardComponent, { className: "TransactionCardComponent", filePath: "src/app/shared/components/transaction-card/transaction-card.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=transaction-card.component.js.map