import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class AmountListItemComponent {
    constructor() {
        this.title = '';
        this.subtitle = '';
        this.icon = '';
        this.color = 'var(--fv-primary)';
        this.amount = 0;
        this.amountPrefix = '';
        this.currencySymbol = 'S/';
        this.amountTone = 'default';
        this.interactive = false;
        this.ariaLabel = '';
        this.activated = new EventEmitter();
    }
    activate() {
        if (this.interactive)
            this.activated.emit();
    }
    static { this.ɵfac = function AmountListItemComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AmountListItemComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AmountListItemComponent, selectors: [["app-amount-list-item"]], inputs: { title: "title", subtitle: "subtitle", icon: "icon", color: "color", amount: "amount", amountPrefix: "amountPrefix", currencySymbol: "currencySymbol", amountTone: "amountTone", interactive: "interactive", ariaLabel: "ariaLabel" }, outputs: { activated: "activated" }, decls: 11, vars: 18, consts: [["type", "button", 1, "amount-list-item", 3, "click", "disabled"], ["size", "sm", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], [1, "amount-list-item__content"], [1, "amount-list-item__amount"], ["src", "assets/icon/right-inline.svg", "alt", "", "aria-hidden", "true", 1, "amount-list-item__chevron"]], template: function AmountListItemComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵlistener("click", function AmountListItemComponent_Template_button_click_0_listener() { return ctx.activate(); });
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
            i0.ɵɵstyleProp("--item-color", ctx.color);
            i0.ɵɵclassProp("amount-list-item--success", ctx.amountTone === "success")("amount-list-item--interactive", ctx.interactive);
            i0.ɵɵproperty("disabled", !ctx.interactive);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel || null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("icon", ctx.icon)("color", ctx.color);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.subtitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3(" ", ctx.amountPrefix, " ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(9, 15, ctx.amount, "1.2-2"), " ");
        } }, dependencies: [CommonModule, i1.DecimalPipe, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n\n.amount-list-item[_ngcontent-%COMP%] {\n  --item-color: var(--fv-primary);\n  display: grid;\n  width: 100%;\n  min-height: 72px;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.amount-list-item[_ngcontent-%COMP%]:disabled {\n  opacity: 1;\n}\n\n.amount-list-item--interactive[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.amount-list-item--interactive[_ngcontent-%COMP%]:active {\n  border-color: color-mix(in srgb, var(--item-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\napp-item-icon[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--item-color) 12%, transparent));\n}\n\n.amount-list-item__content[_ngcontent-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n\n.amount-list-item__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.amount-list-item__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.amount-list-item__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n}\n\n.amount-list-item__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  color: #858b9d;\n  font-size: 10px;\n}\n\n.amount-list-item__amount[_ngcontent-%COMP%] {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n  white-space: nowrap;\n}\n\n.amount-list-item--success[_ngcontent-%COMP%]   .amount-list-item__amount[_ngcontent-%COMP%] {\n  color: var(--fv-success);\n}\n\n.amount-list-item__chevron[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n@media (max-width: 380px) {\n  .amount-list-item[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .amount-list-item__amount[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AmountListItemComponent, [{
        type: Component,
        args: [{ selector: 'app-amount-list-item', standalone: true, imports: [CommonModule, ItemIconComponent], template: "<button\n  type=\"button\"\n  class=\"amount-list-item\"\n  [class.amount-list-item--success]=\"amountTone === 'success'\"\n  [class.amount-list-item--interactive]=\"interactive\"\n  [style.--item-color]=\"color\"\n  [disabled]=\"!interactive\"\n  [attr.aria-label]=\"ariaLabel || null\"\n  (click)=\"activate()\">\n  <app-item-icon\n    [icon]=\"icon\"\n    [color]=\"color\"\n    size=\"sm\"\n    variant=\"soft\"\n    aria-hidden=\"true\">\n  </app-item-icon>\n\n  <span class=\"amount-list-item__content\">\n    <strong>{{ title }}</strong>\n    <small>{{ subtitle }}</small>\n  </span>\n\n  <strong class=\"amount-list-item__amount\">\n    {{ amountPrefix }} {{ currencySymbol }} {{ amount | number:'1.2-2' }}\n  </strong>\n\n  <img\n    class=\"amount-list-item__chevron\"\n    src=\"assets/icon/right-inline.svg\"\n    alt=\"\"\n    aria-hidden=\"true\">\n</button>\n", styles: [":host {\n  display: block;\n  min-width: 0;\n}\n\n.amount-list-item {\n  --item-color: var(--fv-primary);\n  display: grid;\n  width: 100%;\n  min-height: 72px;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  color: inherit;\n  font: inherit;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.amount-list-item:disabled {\n  opacity: 1;\n}\n\n.amount-list-item--interactive {\n  cursor: pointer;\n}\n\n.amount-list-item--interactive:active {\n  border-color: color-mix(in srgb, var(--item-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\napp-item-icon {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--item-color) 12%, transparent));\n}\n\n.amount-list-item__content {\n  display: block;\n  min-width: 0;\n}\n\n.amount-list-item__content strong,\n.amount-list-item__content small {\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.amount-list-item__content strong {\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n}\n\n.amount-list-item__content small {\n  margin-top: 3px;\n  color: #858b9d;\n  font-size: 10px;\n}\n\n.amount-list-item__amount {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  text-align: right;\n  white-space: nowrap;\n}\n\n.amount-list-item--success .amount-list-item__amount {\n  color: var(--fv-success);\n}\n\n.amount-list-item__chevron {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n@media (max-width: 380px) {\n  .amount-list-item {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .amount-list-item__amount {\n    font-size: 10.5px;\n  }\n}\n"] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], icon: [{
            type: Input
        }], color: [{
            type: Input
        }], amount: [{
            type: Input
        }], amountPrefix: [{
            type: Input
        }], currencySymbol: [{
            type: Input
        }], amountTone: [{
            type: Input
        }], interactive: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], activated: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AmountListItemComponent, { className: "AmountListItemComponent", filePath: "src/app/shared/components/amount-list-item/amount-list-item.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=amount-list-item.component.js.map