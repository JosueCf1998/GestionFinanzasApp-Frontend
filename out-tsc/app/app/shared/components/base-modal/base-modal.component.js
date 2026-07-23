import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IonIcon, IonModal } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
function BaseModalComponent_ng_template_1_header_1_p_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.description);
} }
function BaseModalComponent_ng_template_1_header_1_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function BaseModalComponent_ng_template_1_header_1_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.requestClose()); });
    i0.ɵɵelement(1, "ion-icon", 10);
    i0.ɵɵelementEnd();
} }
function BaseModalComponent_ng_template_1_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 5)(1, "div", 6)(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, BaseModalComponent_ng_template_1_header_1_p_4_Template, 2, 1, "p", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BaseModalComponent_ng_template_1_header_1_button_5_Template, 2, 0, "button", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.showClose);
} }
function BaseModalComponent_ng_template_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵprojection(1);
    i0.ɵɵelementEnd();
} }
function BaseModalComponent_ng_template_1_footer_3_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function BaseModalComponent_ng_template_1_footer_3_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.secondary.emit()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.secondaryDisabled);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.secondaryText, " ");
} }
function BaseModalComponent_ng_template_1_footer_3_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function BaseModalComponent_ng_template_1_footer_3_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.primary.emit()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.primaryDisabled);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.primaryText, " ");
} }
function BaseModalComponent_ng_template_1_footer_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "footer", 12);
    i0.ɵɵtemplate(1, BaseModalComponent_ng_template_1_footer_3_button_1_Template, 2, 2, "button", 13)(2, BaseModalComponent_ng_template_1_footer_3_button_2_Template, 2, 2, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("base-modal__footer--reverse", ctx_r0.reverseActions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.secondaryText);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.primaryText);
} }
function BaseModalComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1);
    i0.ɵɵtemplate(1, BaseModalComponent_ng_template_1_header_1_Template, 6, 3, "header", 2)(2, BaseModalComponent_ng_template_1_div_2_Template, 2, 0, "div", 3)(3, BaseModalComponent_ng_template_1_footer_3_Template, 3, 4, "footer", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.showHeader);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.bodyless);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.primaryText || ctx_r0.secondaryText);
} }
export class BaseModalComponent {
    constructor(document) {
        this.document = document;
        this.isOpen = false;
        this.title = '';
        this.description = '';
        this.primaryText = '';
        this.secondaryText = '';
        this.primaryDisabled = false;
        this.secondaryDisabled = false;
        this.backdropDismiss = false;
        this.showHeader = true;
        this.showClose = true;
        this.bodyless = false;
        this.reverseActions = false;
        this.animated = true;
        this.size = 'md';
        this.closed = new EventEmitter();
        this.primary = new EventEmitter();
        this.secondary = new EventEmitter();
        this.closeEmitted = false;
        this.triggerElement = null;
    }
    ngOnChanges(changes) {
        if (changes['isOpen']?.currentValue === true) {
            this.closeEmitted = false;
            this.releaseBackgroundFocus();
        }
    }
    get modalClass() {
        return `base-modal base-modal--${this.size}`;
    }
    requestClose() {
        if (this.closeEmitted)
            return;
        this.closeEmitted = true;
        this.closed.emit();
    }
    handleDidDismiss() {
        this.requestClose();
        const trigger = this.triggerElement;
        this.triggerElement = null;
        if (!trigger?.isConnected)
            return;
        requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
    }
    releaseBackgroundFocus() {
        const activeElement = this.document.activeElement;
        if (!(activeElement instanceof HTMLElement) || activeElement === this.document.body)
            return;
        this.triggerElement = activeElement;
        activeElement.blur();
    }
    static { this.ɵfac = function BaseModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BaseModalComponent)(i0.ɵɵdirectiveInject(DOCUMENT)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BaseModalComponent, selectors: [["app-base-modal"]], inputs: { isOpen: "isOpen", title: "title", description: "description", primaryText: "primaryText", secondaryText: "secondaryText", primaryDisabled: "primaryDisabled", secondaryDisabled: "secondaryDisabled", backdropDismiss: "backdropDismiss", showHeader: "showHeader", showClose: "showClose", bodyless: "bodyless", reverseActions: "reverseActions", animated: "animated", size: "size" }, outputs: { closed: "closed", primary: "primary", secondary: "secondary" }, features: [i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c0, decls: 2, vars: 4, consts: [[3, "didDismiss", "cssClass", "isOpen", "animated", "backdropDismiss"], ["role", "dialog", 1, "base-modal__panel"], ["class", "base-modal__header", 4, "ngIf"], ["class", "base-modal__body", 4, "ngIf"], ["class", "base-modal__footer", 3, "base-modal__footer--reverse", 4, "ngIf"], [1, "base-modal__header"], [1, "base-modal__heading"], [4, "ngIf"], ["type", "button", "class", "base-modal__close", "aria-label", "Cerrar", 3, "click", 4, "ngIf"], ["type", "button", "aria-label", "Cerrar", 1, "base-modal__close", 3, "click"], ["src", "assets/icon/cross.svg"], [1, "base-modal__body"], [1, "base-modal__footer"], ["type", "button", "class", "base-modal__button base-modal__button--secondary", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "base-modal__button base-modal__button--primary", 3, "disabled", "click", 4, "ngIf"], ["type", "button", 1, "base-modal__button", "base-modal__button--secondary", 3, "click", "disabled"], ["type", "button", 1, "base-modal__button", "base-modal__button--primary", 3, "click", "disabled"]], template: function BaseModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "ion-modal", 0);
            i0.ɵɵlistener("didDismiss", function BaseModalComponent_Template_ion_modal_didDismiss_0_listener() { return ctx.handleDidDismiss(); });
            i0.ɵɵtemplate(1, BaseModalComponent_ng_template_1_Template, 4, 4, "ng-template");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("cssClass", ctx.modalClass)("isOpen", ctx.isOpen)("animated", ctx.animated)("backdropDismiss", ctx.backdropDismiss);
        } }, dependencies: [CommonModule, i1.NgIf, IonIcon, IonModal], styles: [".base-modal[_ngcontent-%COMP%] {\n  --backdrop-opacity: 1;\n  --width: calc(100% - 36px);\n  --max-width: 420px;\n  --height: auto;\n  --max-height: min(720px, calc(100vh - 48px));\n  --background: transparent;\n  --border-radius: 22px;\n  --box-shadow: none;\n}\n\n.base-modal[_ngcontent-%COMP%]::part(backdrop) {\n  background: rgba(15, 23, 42, 0.18);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n\n.base-modal--sm[_ngcontent-%COMP%] { --max-width: 360px; --max-height: min(560px, calc(100vh - 48px)); }\n.base-modal--lg[_ngcontent-%COMP%] {\n  --max-width: 480px;\n  --max-height: min(700px, 82dvh);\n}\n.base-modal[_ngcontent-%COMP%]::part(content) { position: relative; contain: content; }\n\n.base-modal__panel[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-height: var(--max-height);\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.08);\n  border-radius: 22px;\n  background: var(--fv-surface, #fff);\n  box-shadow: 0 26px 70px rgba(23, 16, 58, 0.22);\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_base-modal-enter 0.22s ease-out;\n}\n\n.base-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  flex: 0 0 auto;\n  padding: 14px 20px;\n  border-bottom: 1px solid #edf0f7;\n}\n\n.base-modal__heading[_ngcontent-%COMP%] { min-width: 0; }\n.base-modal__heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; color: var(--fv-primary, #3a0ca3); font-size: 20px; font-weight: 700; line-height: 1.25; }\n.base-modal__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; color: var(--fv-text-secondary, #667085); font-size: 12px; line-height: 1.4; }\n\n.base-modal__close[_ngcontent-%COMP%] { display: grid; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; border: 1px solid #edf0f7; border-radius: 12px; background: #f7f8fc; color: var(--fv-primary); place-items: center; }\n.base-modal__close[_ngcontent-%COMP%]:active { transform: scale(.94); }\n.base-modal__close[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] { width: 16px; height: 16px; }\n\n.base-modal__body[_ngcontent-%COMP%] {\n  min-height: 0;\n  padding: 14px 18px;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  scrollbar-gutter: stable;\n  -webkit-overflow-scrolling: touch;\n}\n.base-modal__footer[_ngcontent-%COMP%] { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 10px; flex: 0 0 auto; padding: 10px 18px calc(16px + env(safe-area-inset-bottom)); border-top: 1px solid #edf0f7; background: #fff; }\n.base-modal__footer--reverse[_ngcontent-%COMP%] { direction: rtl; }\n.base-modal__footer--reverse[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] { direction: ltr; }\n.base-modal__button[_ngcontent-%COMP%] { min-height: 46px; padding: 11px 14px; border-radius: 14px; font: inherit; font-size: 14px; font-weight: 700; }\n.base-modal__button--primary[_ngcontent-%COMP%] { border: 0; background: var(--fv-gradient-primary); box-shadow: 0 9px 20px rgba(58,12,163,.2); color: #fff; }\n.base-modal__button--secondary[_ngcontent-%COMP%] { border: 1px solid #dde2ec; background: #fff; color: var(--fv-text-primary); }\n.base-modal__button[_ngcontent-%COMP%]:disabled { opacity: .5; box-shadow: none; }\n\n@keyframes _ngcontent-%COMP%_base-modal-enter { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }\n@media (max-width: 380px) { .base-modal[_ngcontent-%COMP%] { --width: calc(100% - 24px); } .base-modal__header[_ngcontent-%COMP%] { padding: 14px 16px; } .base-modal__body[_ngcontent-%COMP%] { padding: 14px; } .base-modal__footer[_ngcontent-%COMP%] { padding-right: 14px; padding-left: 14px; } }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BaseModalComponent, [{
        type: Component,
        args: [{ selector: 'app-base-modal', standalone: true, imports: [CommonModule, IonIcon, IonModal], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ion-modal\n  [cssClass]=\"modalClass\"\n  [isOpen]=\"isOpen\"\n  [animated]=\"animated\"\n  [backdropDismiss]=\"backdropDismiss\"\n  (didDismiss)=\"handleDidDismiss()\">\n  <ng-template>\n    <section class=\"base-modal__panel\" role=\"dialog\" [attr.aria-label]=\"title\">\n      <header *ngIf=\"showHeader\" class=\"base-modal__header\">\n        <div class=\"base-modal__heading\">\n          <h2>{{ title }}</h2>\n          <p *ngIf=\"description\">{{ description }}</p>\n        </div>\n\n        <button\n          *ngIf=\"showClose\"\n          type=\"button\"\n          class=\"base-modal__close\"\n          aria-label=\"Cerrar\"\n          (click)=\"requestClose()\">\n          <ion-icon src=\"assets/icon/cross.svg\"></ion-icon>\n        </button>\n      </header>\n\n      <div *ngIf=\"!bodyless\" class=\"base-modal__body\">\n        <ng-content></ng-content>\n      </div>\n\n      <footer\n        *ngIf=\"primaryText || secondaryText\"\n        class=\"base-modal__footer\"\n        [class.base-modal__footer--reverse]=\"reverseActions\">\n        <button\n          *ngIf=\"secondaryText\"\n          type=\"button\"\n          class=\"base-modal__button base-modal__button--secondary\"\n          [disabled]=\"secondaryDisabled\"\n          (click)=\"secondary.emit()\">\n          {{ secondaryText }}\n        </button>\n\n        <button\n          *ngIf=\"primaryText\"\n          type=\"button\"\n          class=\"base-modal__button base-modal__button--primary\"\n          [disabled]=\"primaryDisabled\"\n          (click)=\"primary.emit()\">\n          {{ primaryText }}\n        </button>\n      </footer>\n    </section>\n  </ng-template>\n</ion-modal>\n", styles: [".base-modal {\n  --backdrop-opacity: 1;\n  --width: calc(100% - 36px);\n  --max-width: 420px;\n  --height: auto;\n  --max-height: min(720px, calc(100vh - 48px));\n  --background: transparent;\n  --border-radius: 22px;\n  --box-shadow: none;\n}\n\n.base-modal::part(backdrop) {\n  background: rgba(15, 23, 42, 0.18);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n\n.base-modal--sm { --max-width: 360px; --max-height: min(560px, calc(100vh - 48px)); }\n.base-modal--lg {\n  --max-width: 480px;\n  --max-height: min(700px, 82dvh);\n}\n.base-modal::part(content) { position: relative; contain: content; }\n\n.base-modal__panel {\n  display: flex;\n  width: 100%;\n  max-height: var(--max-height);\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.08);\n  border-radius: 22px;\n  background: var(--fv-surface, #fff);\n  box-shadow: 0 26px 70px rgba(23, 16, 58, 0.22);\n  flex-direction: column;\n  animation: base-modal-enter 0.22s ease-out;\n}\n\n.base-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  flex: 0 0 auto;\n  padding: 14px 20px;\n  border-bottom: 1px solid #edf0f7;\n}\n\n.base-modal__heading { min-width: 0; }\n.base-modal__heading h2 { margin: 0; color: var(--fv-primary, #3a0ca3); font-size: 20px; font-weight: 700; line-height: 1.25; }\n.base-modal__heading p { margin: 5px 0 0; color: var(--fv-text-secondary, #667085); font-size: 12px; line-height: 1.4; }\n\n.base-modal__close { display: grid; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; border: 1px solid #edf0f7; border-radius: 12px; background: #f7f8fc; color: var(--fv-primary); place-items: center; }\n.base-modal__close:active { transform: scale(.94); }\n.base-modal__close ion-icon { width: 16px; height: 16px; }\n\n.base-modal__body {\n  min-height: 0;\n  padding: 14px 18px;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  scrollbar-gutter: stable;\n  -webkit-overflow-scrolling: touch;\n}\n.base-modal__footer { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 10px; flex: 0 0 auto; padding: 10px 18px calc(16px + env(safe-area-inset-bottom)); border-top: 1px solid #edf0f7; background: #fff; }\n.base-modal__footer--reverse { direction: rtl; }\n.base-modal__footer--reverse > * { direction: ltr; }\n.base-modal__button { min-height: 46px; padding: 11px 14px; border-radius: 14px; font: inherit; font-size: 14px; font-weight: 700; }\n.base-modal__button--primary { border: 0; background: var(--fv-gradient-primary); box-shadow: 0 9px 20px rgba(58,12,163,.2); color: #fff; }\n.base-modal__button--secondary { border: 1px solid #dde2ec; background: #fff; color: var(--fv-text-primary); }\n.base-modal__button:disabled { opacity: .5; box-shadow: none; }\n\n@keyframes base-modal-enter { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }\n@media (max-width: 380px) { .base-modal { --width: calc(100% - 24px); } .base-modal__header { padding: 14px 16px; } .base-modal__body { padding: 14px; } .base-modal__footer { padding-right: 14px; padding-left: 14px; } }\n"] }]
    }], () => [{ type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }], { isOpen: [{
            type: Input
        }], title: [{
            type: Input,
            args: [{ required: true }]
        }], description: [{
            type: Input
        }], primaryText: [{
            type: Input
        }], secondaryText: [{
            type: Input
        }], primaryDisabled: [{
            type: Input
        }], secondaryDisabled: [{
            type: Input
        }], backdropDismiss: [{
            type: Input
        }], showHeader: [{
            type: Input
        }], showClose: [{
            type: Input
        }], bodyless: [{
            type: Input
        }], reverseActions: [{
            type: Input
        }], animated: [{
            type: Input
        }], size: [{
            type: Input
        }], closed: [{
            type: Output
        }], primary: [{
            type: Output
        }], secondary: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BaseModalComponent, { className: "BaseModalComponent", filePath: "src/app/shared/components/base-modal/base-modal.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=base-modal.component.js.map