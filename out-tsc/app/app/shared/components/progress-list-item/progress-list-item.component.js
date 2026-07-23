import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ProgressListItemComponent_ion_icon_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 8);
} }
const STATUS_LABELS = {
    ON_TRACK: 'En objetivo',
    WARNING: 'Tendencia al exceso',
    EXCEEDED: 'Excedido'
};
export class ProgressListItemComponent {
    constructor() {
        this.currencySymbol = '';
        this.interactive = true;
        this.selected = new EventEmitter();
    }
    get statusLabel() {
        return STATUS_LABELS[this.item.status];
    }
    select() {
        if (!this.interactive)
            return;
        this.selected.emit(this.item);
    }
    static { this.ɵfac = function ProgressListItemComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgressListItemComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgressListItemComponent, selectors: [["app-progress-list-item"]], inputs: { item: "item", currencySymbol: "currencySymbol", interactive: "interactive" }, outputs: { selected: "selected" }, decls: 19, vars: 30, consts: [[1, "progress-item", 3, "click", "keydown.enter"], ["size", "lg", "shape", "rounded", "variant", "soft", 3, "icon", "color"], [1, "progress-item__content"], [1, "progress-item__top"], [1, "progress-item__meta"], [1, "progress-item__status"], [1, "progress-item__progress"], ["class", "progress-item__arrow", "src", "assets/icon/right-inline.svg", 4, "ngIf"], ["src", "assets/icon/right-inline.svg", 1, "progress-item__arrow"]], template: function ProgressListItemComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0);
            i0.ɵɵlistener("click", function ProgressListItemComponent_Template_article_click_0_listener() { return ctx.select(); })("keydown.enter", function ProgressListItemComponent_Template_article_keydown_enter_0_listener() { return ctx.select(); });
            i0.ɵɵelement(1, "app-item-icon", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3)(4, "strong");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "b");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 4)(9, "span", 5);
            i0.ɵɵelement(10, "i");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "number");
            i0.ɵɵpipe(15, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 6);
            i0.ɵɵelement(17, "span");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(18, ProgressListItemComponent_ion_icon_18_Template, 1, 0, "ion-icon", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--item-color", ctx.item.color);
            i0.ɵɵclassProp("progress-item--readonly", !ctx.interactive);
            i0.ɵɵattribute("tabindex", ctx.interactive ? 0 : null)("role", ctx.interactive ? "button" : "listitem")("aria-label", ctx.interactive ? "Abrir " + ctx.item.name : ctx.item.name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("icon", ctx.item.icon)("color", ctx.item.color);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.item.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.item.percentage, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("data-status", ctx.item.status);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.statusLabel, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate4(" ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(14, 24, ctx.item.used, "1.0-2"), " de ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(15, 27, ctx.item.budgeted, "1.0-2"), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.item.percentage > 100 ? 100 : ctx.item.percentage, "%");
            i0.ɵɵclassProp("warning", ctx.item.status === "WARNING")("exceeded", ctx.item.status === "EXCEEDED");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.interactive);
        } }, dependencies: [CommonModule, i1.NgIf, i1.DecimalPipe, IonIcon, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.progress-item[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  min-height: 72px;\n  align-items: center;\n  padding: 10px 10px 10px 12px;\n  overflow: hidden;\n  border: 0;\n  border-radius: 16px;\n  background: var(--list-surface, var(--fv-surface));\n  box-shadow: 0 4px 14px rgba(30, 41, 59, 0.045);\n  cursor: pointer;\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n\n  &:active {\n    transform: scale(0.985);\n  }\n}\n\n.progress-item--readonly[_ngcontent-%COMP%] {\n  cursor: default;\n\n  &:active {\n    transform: none;\n  }\n}\n\n.progress-item[_ngcontent-%COMP%]    > app-item-icon[_ngcontent-%COMP%] {\n  display: block;\n  flex: 0 0 auto;\n  margin-right: 15px;\n}\n\n.progress-item__content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.progress-item__top[_ngcontent-%COMP%], \n.progress-item__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.progress-item__top[_ngcontent-%COMP%] {\n  strong {\n    overflow: hidden;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-footnote);\n    font-weight: var(--fv-fw-bold);\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  b {\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-footnote);\n  }\n}\n\n.progress-item__meta[_ngcontent-%COMP%] {\n  margin-top: 3px;\n\n  > span:last-child {\n    overflow: hidden;\n    color: var(--fv-text-muted);\n    font-size: var(--fv-type-caption-2);\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.progress-item__status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-width: 0;\n  color: var(--list-success, var(--fv-success));\n  font-size: var(--fv-type-caption-2);\n  white-space: nowrap;\n\n  i {\n    width: 7px;\n    height: 7px;\n    flex: 0 0 7px;\n    margin-right: 5px;\n    border-radius: 50%;\n    background: currentColor;\n  }\n\n  &[data-status='WARNING'] {\n    color: var(--list-warning, var(--fv-warning));\n  }\n\n  &[data-status='EXCEEDED'] {\n    color: var(--list-danger, var(--fv-danger));\n  }\n}\n\n.progress-item__progress[_ngcontent-%COMP%] {\n  height: 4px;\n  margin-top: 7px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #edf0f5;\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(\n      90deg,\n      var(--item-color),\n      color-mix(in srgb, var(--item-color) 72%, white)\n    );\n  }\n\n  span.warning {\n    background: var(--list-warning, var(--fv-warning));\n  }\n\n  span.exceeded {\n    background: var(--list-danger, var(--fv-danger));\n  }\n}\n\n.progress-item__arrow[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 16px;\n  margin-left: 9px;\n  color: var(--fv-text-muted);\n}\n\n.progress-item[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(67, 97, 238, 0.18);\n  outline-offset: 2px;\n}\n\n@media (hover: hover) {\n  .progress-item[_ngcontent-%COMP%]:not(.progress-item--readonly):hover {\n    transform: translateY(-1px);\n    box-shadow: 0 9px 24px rgba(30, 41, 59, 0.08);\n  }\n}\n\n@media (max-width: 380px) {\n  .progress-item__meta[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    max-width: 132px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgressListItemComponent, [{
        type: Component,
        args: [{ selector: 'app-progress-list-item', standalone: true, imports: [CommonModule, IonIcon, ItemIconComponent], template: "<article\n  class=\"progress-item\"\n  [class.progress-item--readonly]=\"!interactive\"\n  [attr.tabindex]=\"interactive ? 0 : null\"\n  [attr.role]=\"interactive ? 'button' : 'listitem'\"\n  [style.--item-color]=\"item.color\"\n  [attr.aria-label]=\"interactive ? 'Abrir ' + item.name : item.name\"\n  (click)=\"select()\"\n  (keydown.enter)=\"select()\">\n\n  <app-item-icon\n    [icon]=\"item.icon\"\n    [color]=\"item.color\"\n    size=\"lg\"\n    shape=\"rounded\"\n    variant=\"soft\">\n  </app-item-icon>\n\n  <div class=\"progress-item__content\">\n    <div class=\"progress-item__top\">\n      <strong>{{ item.name }}</strong>\n      <b>{{ item.percentage }}%</b>\n    </div>\n\n    <div class=\"progress-item__meta\">\n      <span class=\"progress-item__status\" [attr.data-status]=\"item.status\">\n        <i></i>\n        {{ statusLabel }}\n      </span>\n\n      <span>\n        {{ currencySymbol }} {{ item.used | number:'1.0-2' }}\n        de\n        {{ currencySymbol }} {{ item.budgeted | number:'1.0-2' }}\n      </span>\n    </div>\n\n    <div class=\"progress-item__progress\">\n      <span\n        [class.warning]=\"item.status === 'WARNING'\"\n        [class.exceeded]=\"item.status === 'EXCEEDED'\"\n        [style.width.%]=\"item.percentage > 100 ? 100 : item.percentage\">\n      </span>\n    </div>\n  </div>\n\n  <ion-icon\n    *ngIf=\"interactive\"\n    class=\"progress-item__arrow\"\n    src=\"assets/icon/right-inline.svg\">\n  </ion-icon>\n</article>\n", styles: [":host {\n  display: block;\n}\n\n.progress-item {\n  position: relative;\n  display: flex;\n  min-height: 72px;\n  align-items: center;\n  padding: 10px 10px 10px 12px;\n  overflow: hidden;\n  border: 0;\n  border-radius: 16px;\n  background: var(--list-surface, var(--fv-surface));\n  box-shadow: 0 4px 14px rgba(30, 41, 59, 0.045);\n  cursor: pointer;\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n\n  &:active {\n    transform: scale(0.985);\n  }\n}\n\n.progress-item--readonly {\n  cursor: default;\n\n  &:active {\n    transform: none;\n  }\n}\n\n.progress-item > app-item-icon {\n  display: block;\n  flex: 0 0 auto;\n  margin-right: 15px;\n}\n\n.progress-item__content {\n  flex: 1;\n  min-width: 0;\n}\n\n.progress-item__top,\n.progress-item__meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.progress-item__top {\n  strong {\n    overflow: hidden;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-footnote);\n    font-weight: var(--fv-fw-bold);\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  b {\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-footnote);\n  }\n}\n\n.progress-item__meta {\n  margin-top: 3px;\n\n  > span:last-child {\n    overflow: hidden;\n    color: var(--fv-text-muted);\n    font-size: var(--fv-type-caption-2);\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.progress-item__status {\n  display: inline-flex;\n  align-items: center;\n  min-width: 0;\n  color: var(--list-success, var(--fv-success));\n  font-size: var(--fv-type-caption-2);\n  white-space: nowrap;\n\n  i {\n    width: 7px;\n    height: 7px;\n    flex: 0 0 7px;\n    margin-right: 5px;\n    border-radius: 50%;\n    background: currentColor;\n  }\n\n  &[data-status='WARNING'] {\n    color: var(--list-warning, var(--fv-warning));\n  }\n\n  &[data-status='EXCEEDED'] {\n    color: var(--list-danger, var(--fv-danger));\n  }\n}\n\n.progress-item__progress {\n  height: 4px;\n  margin-top: 7px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #edf0f5;\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(\n      90deg,\n      var(--item-color),\n      color-mix(in srgb, var(--item-color) 72%, white)\n    );\n  }\n\n  span.warning {\n    background: var(--list-warning, var(--fv-warning));\n  }\n\n  span.exceeded {\n    background: var(--list-danger, var(--fv-danger));\n  }\n}\n\n.progress-item__arrow {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 16px;\n  margin-left: 9px;\n  color: var(--fv-text-muted);\n}\n\n.progress-item:focus-visible {\n  outline: 3px solid rgba(67, 97, 238, 0.18);\n  outline-offset: 2px;\n}\n\n@media (hover: hover) {\n  .progress-item:not(.progress-item--readonly):hover {\n    transform: translateY(-1px);\n    box-shadow: 0 9px 24px rgba(30, 41, 59, 0.08);\n  }\n}\n\n@media (max-width: 380px) {\n  .progress-item__meta > span:last-child {\n    max-width: 132px;\n  }\n}\n"] }]
    }], null, { item: [{
            type: Input,
            args: [{ required: true }]
        }], currencySymbol: [{
            type: Input
        }], interactive: [{
            type: Input
        }], selected: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgressListItemComponent, { className: "ProgressListItemComponent", filePath: "src/app/shared/components/progress-list-item/progress-list-item.component.ts", lineNumber: 32 }); })();
//# sourceMappingURL=progress-list-item.component.js.map