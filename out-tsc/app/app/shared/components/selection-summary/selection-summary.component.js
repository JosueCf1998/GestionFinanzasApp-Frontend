import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SelectionSummaryComponent_app_item_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("icon", ctx_r0.fallbackIconName)("color", ctx_r0.fallbackIconColor);
} }
function SelectionSummaryComponent_span_3_app_item_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 11);
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("icon", item_r2.icon)("color", item_r2.color);
} }
function SelectionSummaryComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtemplate(1, SelectionSummaryComponent_span_3_app_item_icon_1_Template, 1, 2, "app-item-icon", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selection-summary__preview--single", ctx_r0.items.length === 1)("selection-summary__preview--double", ctx_r0.items.length === 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.visibleItems);
} }
function SelectionSummaryComponent_ion_icon_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 12);
} }
function SelectionSummaryComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.trailingText, " ");
} }
function SelectionSummaryComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function SelectionSummaryComponent_button_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.activated.emit()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "ion-icon", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r0.interactive);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.actionText);
} }
export class SelectionSummaryComponent {
    constructor() {
        this.fallbackIconColor = 'var(--fv-interactive-icon)';
        this.primaryText = '';
        this.secondaryText = '';
        this.ariaLabel = '';
        this.fallbackIcon = '';
        this.items = [];
        this.interactive = true;
        this.showArrow = true;
        this.actionText = '';
        this.actionOnly = false;
        this.trailingText = '';
        this.activated = new EventEmitter();
    }
    get visibleItems() {
        return this.items.slice(0, 3);
    }
    get fallbackIconName() {
        return this.fallbackIcon.split('/').pop()?.replace(/\.svg$/i, '') ?? '';
    }
    static { this.ɵfac = function SelectionSummaryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SelectionSummaryComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SelectionSummaryComponent, selectors: [["app-selection-summary"]], inputs: { primaryText: "primaryText", secondaryText: "secondaryText", ariaLabel: "ariaLabel", fallbackIcon: "fallbackIcon", items: "items", interactive: "interactive", showArrow: "showArrow", actionText: "actionText", actionOnly: "actionOnly", trailingText: "trailingText" }, outputs: { activated: "activated" }, decls: 12, vars: 9, consts: [[1, "selection-summary"], ["type", "button", 1, "selection-summary__body", 3, "click", "disabled"], ["size", "md", "variant", "soft", "aria-hidden", "true", 3, "icon", "color", 4, "ngIf"], ["class", "selection-summary__preview", "aria-hidden", "true", 3, "selection-summary__preview--single", "selection-summary__preview--double", 4, "ngIf"], [1, "selection-summary__content"], ["class", "selection-summary__arrow", "src", "assets/icon/right-inline.svg", "aria-hidden", "true", 4, "ngIf"], ["class", "selection-summary__trailing", 4, "ngIf"], ["type", "button", "class", "selection-summary__action", 3, "disabled", "click", 4, "ngIf"], ["size", "md", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], ["aria-hidden", "true", 1, "selection-summary__preview"], ["size", "sm", "variant", "soft", 3, "icon", "color", 4, "ngFor", "ngForOf"], ["size", "sm", "variant", "soft", 3, "icon", "color"], ["src", "assets/icon/right-inline.svg", "aria-hidden", "true", 1, "selection-summary__arrow"], [1, "selection-summary__trailing"], ["type", "button", 1, "selection-summary__action", 3, "click", "disabled"], ["src", "assets/icon/right-inline.svg", "aria-hidden", "true"]], template: function SelectionSummaryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function SelectionSummaryComponent_Template_button_click_1_listener() { return ctx.activated.emit(); });
            i0.ɵɵtemplate(2, SelectionSummaryComponent_app_item_icon_2_Template, 1, 2, "app-item-icon", 2)(3, SelectionSummaryComponent_span_3_Template, 2, 5, "span", 3);
            i0.ɵɵelementStart(4, "span", 4)(5, "strong");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "small");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, SelectionSummaryComponent_ion_icon_9_Template, 1, 0, "ion-icon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, SelectionSummaryComponent_span_10_Template, 2, 1, "span", 6)(11, SelectionSummaryComponent_button_11_Template, 4, 2, "button", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.interactive || ctx.actionOnly);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.items.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.items.length);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.primaryText);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.secondaryText);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showArrow && !ctx.actionText);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.trailingText);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.actionText);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IonIcon, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.selection-summary[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 36px;\n  align-items: center;\n  gap: 11px;\n}\n\n.selection-summary__body[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  flex: 1;\n  align-items: center;\n  gap: 11px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  font: inherit;\n  text-align: left;\n\n  &:not(:disabled):active {\n    transform: scale(.99);\n  }\n\n  &:not(:disabled):focus-visible {\n    border-radius: 12px;\n    outline: 2px solid rgba(67, 24, 184, 0.15);\n    outline-offset: 4px;\n  }\n\n  &:disabled {\n    opacity: 1;\n  }\n\n  .selection-summary__preview {\n    position: relative;\n    display: block;\n    width: 42px;\n    height: 32px;\n    flex: 0 0 42px;\n\n    &--single {\n      width: 34px;\n      flex-basis: 34px;\n    }\n\n    &--double {\n      width: 38px;\n      flex-basis: 38px;\n    }\n\n    app-item-icon {\n      position: absolute;\n      top: 0;\n      left: 0;\n      display: block;\n      margin: 0;\n      border-radius: 12px;\n\n      &:first-child {\n        z-index: 3;\n      }\n\n      &:nth-child(2) {\n        top: -4px;\n        left: 4px;\n        z-index: 2;\n      }\n\n      &:nth-child(3) {\n        top: -8px;\n        left: 8px;\n        z-index: 1;\n      }\n    }\n\n    &--single app-item-icon {\n      top: 0;\n      left: 1px;\n    }\n  }\n\n  .selection-summary__content {\n    display: grid;\n    min-width: 0;\n    flex: 1;\n    gap: 4px;\n\n    strong,\n    small {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    strong {\n      color: #2e3442;\n      font-size: 13px;\n      font-weight: 700;\n    }\n\n    small {\n      color: #7b8498;\n      font-size: 11px;\n    }\n  }\n\n  .selection-summary__arrow {\n    width: 17px;\n    height: 17px;\n    flex: 0 0 17px;\n    color: var(--fv-primary, #4318b8);\n  }\n\n}\n\n.selection-summary__action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 32px;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 9px 6px 11px;\n  border: 1px solid color-mix(in srgb, var(--fv-primary, #4318b8) 16%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-primary, #4318b8) 7%, transparent);\n  color: var(--fv-primary, #4318b8);\n  font: inherit;\n  font-size: var(--fv-type-caption-1, 12px);\n  font-weight: var(--fv-fw-semibold, 600);\n  white-space: nowrap;\n  transition: background .18s ease, border-color .18s ease, transform .18s ease;\n\n  &:active {\n    transform: scale(.97);\n    background: color-mix(in srgb, var(--fv-primary, #4318b8) 13%, transparent);\n  }\n\n  &:focus-visible {\n    outline: 2px solid rgba(67, 24, 184, 0.15);\n    outline-offset: 2px;\n  }\n\n  ion-icon {\n    width: 14px;\n    height: 14px;\n    flex: 0 0 14px;\n  }\n}\n\n.selection-summary__trailing[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: var(--fv-text-primary, #172033);\n  font-size: var(--fv-type-footnote, 13px);\n  font-weight: var(--fv-fw-bold, 700);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n@media (hover: hover) {\n  .selection-summary__action[_ngcontent-%COMP%]:hover {\n    border-color: color-mix(in srgb, var(--fv-primary, #4318b8) 28%, transparent);\n    background: color-mix(in srgb, var(--fv-primary, #4318b8) 11%, transparent);\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectionSummaryComponent, [{
        type: Component,
        args: [{ selector: 'app-selection-summary', standalone: true, imports: [CommonModule, IonIcon, ItemIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"selection-summary\">\n  <button\n    type=\"button\"\n    class=\"selection-summary__body\"\n    [disabled]=\"!interactive || actionOnly\"\n    [attr.aria-label]=\"ariaLabel\"\n    (click)=\"activated.emit()\">\n    <app-item-icon\n      *ngIf=\"!items.length\"\n      [icon]=\"fallbackIconName\"\n      [color]=\"fallbackIconColor\"\n      size=\"md\"\n      variant=\"soft\"\n      aria-hidden=\"true\">\n    </app-item-icon>\n\n    <span\n      *ngIf=\"items.length\"\n      class=\"selection-summary__preview\"\n      [class.selection-summary__preview--single]=\"items.length === 1\"\n      [class.selection-summary__preview--double]=\"items.length === 2\"\n      aria-hidden=\"true\">\n      <app-item-icon\n        *ngFor=\"let item of visibleItems\"\n        [icon]=\"item.icon\"\n        [color]=\"item.color\"\n        size=\"sm\"\n        variant=\"soft\">\n      </app-item-icon>\n    </span>\n\n    <span class=\"selection-summary__content\">\n      <strong>{{ primaryText }}</strong>\n      <small>{{ secondaryText }}</small>\n    </span>\n\n    <ion-icon\n      *ngIf=\"showArrow && !actionText\"\n      class=\"selection-summary__arrow\"\n      src=\"assets/icon/right-inline.svg\"\n      aria-hidden=\"true\">\n    </ion-icon>\n  </button>\n\n  <span *ngIf=\"trailingText\" class=\"selection-summary__trailing\">\n    {{ trailingText }}\n  </span>\n\n  <button\n    *ngIf=\"actionText\"\n    type=\"button\"\n    class=\"selection-summary__action\"\n    [disabled]=\"!interactive\"\n    (click)=\"activated.emit()\">\n    <span>{{ actionText }}</span>\n    <ion-icon src=\"assets/icon/right-inline.svg\" aria-hidden=\"true\"></ion-icon>\n  </button>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.selection-summary {\n  display: flex;\n  width: 100%;\n  min-height: 36px;\n  align-items: center;\n  gap: 11px;\n}\n\n.selection-summary__body {\n  display: flex;\n  min-width: 0;\n  flex: 1;\n  align-items: center;\n  gap: 11px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  font: inherit;\n  text-align: left;\n\n  &:not(:disabled):active {\n    transform: scale(.99);\n  }\n\n  &:not(:disabled):focus-visible {\n    border-radius: 12px;\n    outline: 2px solid rgba(67, 24, 184, 0.15);\n    outline-offset: 4px;\n  }\n\n  &:disabled {\n    opacity: 1;\n  }\n\n  .selection-summary__preview {\n    position: relative;\n    display: block;\n    width: 42px;\n    height: 32px;\n    flex: 0 0 42px;\n\n    &--single {\n      width: 34px;\n      flex-basis: 34px;\n    }\n\n    &--double {\n      width: 38px;\n      flex-basis: 38px;\n    }\n\n    app-item-icon {\n      position: absolute;\n      top: 0;\n      left: 0;\n      display: block;\n      margin: 0;\n      border-radius: 12px;\n\n      &:first-child {\n        z-index: 3;\n      }\n\n      &:nth-child(2) {\n        top: -4px;\n        left: 4px;\n        z-index: 2;\n      }\n\n      &:nth-child(3) {\n        top: -8px;\n        left: 8px;\n        z-index: 1;\n      }\n    }\n\n    &--single app-item-icon {\n      top: 0;\n      left: 1px;\n    }\n  }\n\n  .selection-summary__content {\n    display: grid;\n    min-width: 0;\n    flex: 1;\n    gap: 4px;\n\n    strong,\n    small {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    strong {\n      color: #2e3442;\n      font-size: 13px;\n      font-weight: 700;\n    }\n\n    small {\n      color: #7b8498;\n      font-size: 11px;\n    }\n  }\n\n  .selection-summary__arrow {\n    width: 17px;\n    height: 17px;\n    flex: 0 0 17px;\n    color: var(--fv-primary, #4318b8);\n  }\n\n}\n\n.selection-summary__action {\n  display: inline-flex;\n  min-height: 32px;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 9px 6px 11px;\n  border: 1px solid color-mix(in srgb, var(--fv-primary, #4318b8) 16%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-primary, #4318b8) 7%, transparent);\n  color: var(--fv-primary, #4318b8);\n  font: inherit;\n  font-size: var(--fv-type-caption-1, 12px);\n  font-weight: var(--fv-fw-semibold, 600);\n  white-space: nowrap;\n  transition: background .18s ease, border-color .18s ease, transform .18s ease;\n\n  &:active {\n    transform: scale(.97);\n    background: color-mix(in srgb, var(--fv-primary, #4318b8) 13%, transparent);\n  }\n\n  &:focus-visible {\n    outline: 2px solid rgba(67, 24, 184, 0.15);\n    outline-offset: 2px;\n  }\n\n  ion-icon {\n    width: 14px;\n    height: 14px;\n    flex: 0 0 14px;\n  }\n}\n\n.selection-summary__trailing {\n  flex: 0 0 auto;\n  color: var(--fv-text-primary, #172033);\n  font-size: var(--fv-type-footnote, 13px);\n  font-weight: var(--fv-fw-bold, 700);\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n@media (hover: hover) {\n  .selection-summary__action:hover {\n    border-color: color-mix(in srgb, var(--fv-primary, #4318b8) 28%, transparent);\n    background: color-mix(in srgb, var(--fv-primary, #4318b8) 11%, transparent);\n  }\n}\n"] }]
    }], null, { primaryText: [{
            type: Input,
            args: [{ required: true }]
        }], secondaryText: [{
            type: Input,
            args: [{ required: true }]
        }], ariaLabel: [{
            type: Input,
            args: [{ required: true }]
        }], fallbackIcon: [{
            type: Input
        }], items: [{
            type: Input
        }], interactive: [{
            type: Input
        }], showArrow: [{
            type: Input
        }], actionText: [{
            type: Input
        }], actionOnly: [{
            type: Input
        }], trailingText: [{
            type: Input
        }], activated: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SelectionSummaryComponent, { className: "SelectionSummaryComponent", filePath: "src/app/shared/components/selection-summary/selection-summary.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=selection-summary.component.js.map