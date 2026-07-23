import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
function FeatureHeaderComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.eyebrow);
} }
function FeatureHeaderComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
function FeatureHeaderComponent_h2_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
function FeatureHeaderComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.description);
} }
function FeatureHeaderComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "img", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-hidden", ctx_r0.imageAlt ? null : true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.imageSrc, i0.ɵɵsanitizeUrl)("alt", ctx_r0.imageAlt);
} }
export class FeatureHeaderComponent {
    constructor() {
        this.title = '';
        this.description = '';
        this.eyebrow = '';
        this.imageSrc = '';
        this.imageAlt = '';
        this.variant = 'default';
        this.headingLevel = 1;
    }
    get hostClasses() {
        return {
            [`feature-header--${this.variant}`]: true,
            'feature-header--without-image': !this.imageSrc
        };
    }
    static { this.ɵfac = function FeatureHeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FeatureHeaderComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FeatureHeaderComponent, selectors: [["app-feature-header"]], inputs: { title: "title", description: "description", eyebrow: "eyebrow", imageSrc: "imageSrc", imageAlt: "imageAlt", variant: "variant", headingLevel: "headingLevel" }, ngContentSelectors: _c0, decls: 9, vars: 6, consts: [[1, "feature-header", 3, "ngClass"], [1, "feature-header__content"], ["class", "feature-header__eyebrow", 4, "ngIf"], [4, "ngIf"], [1, "feature-header__actions"], ["class", "feature-header__visual", 4, "ngIf"], [1, "feature-header__eyebrow"], [1, "feature-header__visual"], [3, "src", "alt"]], template: function FeatureHeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, FeatureHeaderComponent_span_2_Template, 2, 1, "span", 2)(3, FeatureHeaderComponent_h1_3_Template, 2, 1, "h1", 3)(4, FeatureHeaderComponent_h2_4_Template, 2, 1, "h2", 3)(5, FeatureHeaderComponent_p_5_Template, 2, 1, "p", 3);
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵprojection(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, FeatureHeaderComponent_div_8_Template, 2, 3, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", ctx.hostClasses);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.eyebrow);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.headingLevel === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.headingLevel === 2);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.description);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.imageSrc);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgIf], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.feature-header[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n  display: flex;\n  min-height: 104px;\n  align-items: center;\n  padding: 15px 16px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.09);\n  border-radius: 19px;\n  background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 52%, #e9edff 100%);\n  box-shadow: 0 8px 26px rgba(58, 12, 163, 0.07);\n\n  &::before,\n  &::after {\n    position: absolute;\n    z-index: -1;\n    border-radius: 50%;\n    content: '';\n    pointer-events: none;\n  }\n\n  &::before {\n    top: -78px;\n    right: -54px;\n    width: 190px;\n    height: 190px;\n    background: rgba(67, 97, 238, 0.075);\n  }\n\n  &::after {\n    right: 76px;\n    bottom: -68px;\n    width: 120px;\n    height: 120px;\n    background: rgba(58, 12, 163, 0.04);\n  }\n}\n\n.feature-header__content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  padding-right: 12px;\n\n  h1,\n  h2 {\n    margin: 0;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-title-3);\n    font-weight: var(--fv-fw-bold);\n    letter-spacing: -0.8px;\n    line-height: 1.15;\n    text-wrap: balance;\n  }\n\n  p {\n    max-width: 280px;\n    margin: 5px 0 0;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-footnote);\n    line-height: 1.4;\n  }\n}\n\n.feature-header__eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  color: var(--fv-primary);\n  font-size: var(--fv-type-caption-1);\n  font-weight: var(--fv-fw-bold);\n  letter-spacing: 0.45px;\n  text-transform: uppercase;\n}\n\n.feature-header__visual[_ngcontent-%COMP%] {\n  display: grid;\n  width: 68px;\n  height: 68px;\n  flex: 0 0 68px;\n  place-items: center;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.06);\n  border-radius: 18px;\n  background: #ffffff;\n  box-shadow: 0 8px 20px rgba(58, 12, 163, 0.1);\n  transform: rotate(2deg);\n\n  img {\n    display: block;\n    width: 100%;\n    height: 100%;\n    border-radius: 16px;\n    object-fit: contain;\n    filter: none;\n  }\n\n}\n\n.feature-header__actions[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n\n.feature-header__actions[_ngcontent-%COMP%]:not(:empty) {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n}\n\n.feature-header--compact[_ngcontent-%COMP%] {\n  min-height: 84px;\n  padding: 12px 14px;\n\n  .feature-header__visual {\n    width: 58px;\n    height: 58px;\n    flex-basis: 58px;\n  }\n}\n\n.feature-header--accent[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.12);\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n\n  .feature-header__eyebrow,\n  h1,\n  h2 {\n    color: #ffffff;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.75);\n  }\n\n  &::before,\n  &::after {\n    background: rgba(255, 255, 255, 0.07);\n  }\n}\n\n.feature-header--without-image[_ngcontent-%COMP%]   .feature-header__content[_ngcontent-%COMP%] {\n  padding-right: 0;\n}\n\n@media (max-width: 360px) {\n  .feature-header[_ngcontent-%COMP%] {\n    min-height: 96px;\n    padding: 14px;\n  }\n\n  .feature-header__visual[_ngcontent-%COMP%] {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeatureHeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-feature-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"feature-header\" [ngClass]=\"hostClasses\">\n  <div class=\"feature-header__content\">\n    <span *ngIf=\"eyebrow\" class=\"feature-header__eyebrow\">{{ eyebrow }}</span>\n\n    <h1 *ngIf=\"headingLevel === 1\">{{ title }}</h1>\n    <h2 *ngIf=\"headingLevel === 2\">{{ title }}</h2>\n\n    <p *ngIf=\"description\">{{ description }}</p>\n\n    <div class=\"feature-header__actions\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n\n  <div *ngIf=\"imageSrc\" class=\"feature-header__visual\" [attr.aria-hidden]=\"imageAlt ? null : true\">\n    <img [src]=\"imageSrc\" [alt]=\"imageAlt\">\n  </div>\n</header>\n", styles: [":host {\n  display: block;\n}\n\n.feature-header {\n  position: relative;\n  isolation: isolate;\n  display: flex;\n  min-height: 104px;\n  align-items: center;\n  padding: 15px 16px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.09);\n  border-radius: 19px;\n  background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 52%, #e9edff 100%);\n  box-shadow: 0 8px 26px rgba(58, 12, 163, 0.07);\n\n  &::before,\n  &::after {\n    position: absolute;\n    z-index: -1;\n    border-radius: 50%;\n    content: '';\n    pointer-events: none;\n  }\n\n  &::before {\n    top: -78px;\n    right: -54px;\n    width: 190px;\n    height: 190px;\n    background: rgba(67, 97, 238, 0.075);\n  }\n\n  &::after {\n    right: 76px;\n    bottom: -68px;\n    width: 120px;\n    height: 120px;\n    background: rgba(58, 12, 163, 0.04);\n  }\n}\n\n.feature-header__content {\n  flex: 1;\n  min-width: 0;\n  padding-right: 12px;\n\n  h1,\n  h2 {\n    margin: 0;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-title-3);\n    font-weight: var(--fv-fw-bold);\n    letter-spacing: -0.8px;\n    line-height: 1.15;\n    text-wrap: balance;\n  }\n\n  p {\n    max-width: 280px;\n    margin: 5px 0 0;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-footnote);\n    line-height: 1.4;\n  }\n}\n\n.feature-header__eyebrow {\n  display: block;\n  margin-bottom: 4px;\n  color: var(--fv-primary);\n  font-size: var(--fv-type-caption-1);\n  font-weight: var(--fv-fw-bold);\n  letter-spacing: 0.45px;\n  text-transform: uppercase;\n}\n\n.feature-header__visual {\n  display: grid;\n  width: 68px;\n  height: 68px;\n  flex: 0 0 68px;\n  place-items: center;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.06);\n  border-radius: 18px;\n  background: #ffffff;\n  box-shadow: 0 8px 20px rgba(58, 12, 163, 0.1);\n  transform: rotate(2deg);\n\n  img {\n    display: block;\n    width: 100%;\n    height: 100%;\n    border-radius: 16px;\n    object-fit: contain;\n    filter: none;\n  }\n\n}\n\n.feature-header__actions:empty {\n  display: none;\n}\n\n.feature-header__actions:not(:empty) {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n}\n\n.feature-header--compact {\n  min-height: 84px;\n  padding: 12px 14px;\n\n  .feature-header__visual {\n    width: 58px;\n    height: 58px;\n    flex-basis: 58px;\n  }\n}\n\n.feature-header--accent {\n  border-color: rgba(255, 255, 255, 0.12);\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n\n  .feature-header__eyebrow,\n  h1,\n  h2 {\n    color: #ffffff;\n  }\n\n  p {\n    color: rgba(255, 255, 255, 0.75);\n  }\n\n  &::before,\n  &::after {\n    background: rgba(255, 255, 255, 0.07);\n  }\n}\n\n.feature-header--without-image .feature-header__content {\n  padding-right: 0;\n}\n\n@media (max-width: 360px) {\n  .feature-header {\n    min-height: 96px;\n    padding: 14px;\n  }\n\n  .feature-header__visual {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n}\n"] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], description: [{
            type: Input
        }], eyebrow: [{
            type: Input
        }], imageSrc: [{
            type: Input
        }], imageAlt: [{
            type: Input
        }], variant: [{
            type: Input
        }], headingLevel: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FeatureHeaderComponent, { className: "FeatureHeaderComponent", filePath: "src/app/shared/components/feature-header/feature-header.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=feature-header.component.js.map