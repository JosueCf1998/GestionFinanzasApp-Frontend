import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = ["*"];
function SectionCardComponent_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 4)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
export class SectionCardComponent {
    constructor() {
        this.title = '';
        this.appearance = 'card';
    }
    static { this.ɵfac = function SectionCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SectionCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SectionCardComponent, selectors: [["app-section-card"]], inputs: { title: "title", appearance: "appearance" }, ngContentSelectors: _c0, decls: 5, vars: 5, consts: [[1, "section-card-section"], ["class", "section-card__header", 4, "ngIf"], [1, "section-card"], [1, "section-card__content"], [1, "section-card__header"]], template: function SectionCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵtemplate(1, SectionCardComponent_header_1_Template, 3, 1, "header", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3);
            i0.ɵɵprojection(4);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("section-card-section--plain", ctx.appearance === "plain");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("section-card--plain", ctx.appearance === "plain");
        } }, dependencies: [NgIf], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.section-card-section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n}\n\n.section-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 2px;\n\n  h3 {\n    flex: 0 0 auto;\n    margin: 0;\n    color: var(--fv-text-secondary, #64748b);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.07em;\n    text-transform: uppercase;\n  }\n\n  &::after {\n    height: 1px;\n    flex: 1;\n    background: linear-gradient(90deg, rgba(67, 97, 238, 0.22), transparent);\n    content: '';\n  }\n}\n\n.section-card[_ngcontent-%COMP%] {\n  padding: 17px;\n  border: 1px solid #edf0f5;\n  border-radius: 19px;\n  background: rgba(255, 255, 255, 0.96);\n  box-shadow: 0 7px 22px rgba(34, 39, 76, 0.055);\n}\n\n.section-card--plain[_ngcontent-%COMP%] {\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.section-card__content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n@media (max-width: 420px) {\n  .section-card[_ngcontent-%COMP%]:not(.section-card--plain) {\n    padding: 15px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SectionCardComponent, [{
        type: Component,
        args: [{ selector: 'app-section-card', standalone: true, imports: [NgIf], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section\n  class=\"section-card-section\"\n  [class.section-card-section--plain]=\"appearance === 'plain'\">\n  <header *ngIf=\"title\" class=\"section-card__header\">\n    <h3>{{ title }}</h3>\n  </header>\n\n  <div\n    class=\"section-card\"\n    [class.section-card--plain]=\"appearance === 'plain'\">\n    <div class=\"section-card__content\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.section-card-section {\n  display: grid;\n  gap: 9px;\n}\n\n.section-card__header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 2px;\n\n  h3 {\n    flex: 0 0 auto;\n    margin: 0;\n    color: var(--fv-text-secondary, #64748b);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.07em;\n    text-transform: uppercase;\n  }\n\n  &::after {\n    height: 1px;\n    flex: 1;\n    background: linear-gradient(90deg, rgba(67, 97, 238, 0.22), transparent);\n    content: '';\n  }\n}\n\n.section-card {\n  padding: 17px;\n  border: 1px solid #edf0f5;\n  border-radius: 19px;\n  background: rgba(255, 255, 255, 0.96);\n  box-shadow: 0 7px 22px rgba(34, 39, 76, 0.055);\n}\n\n.section-card--plain {\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.section-card__content {\n  display: grid;\n  gap: 14px;\n}\n\n@media (max-width: 420px) {\n  .section-card:not(.section-card--plain) {\n    padding: 15px;\n  }\n}\n"] }]
    }], null, { title: [{
            type: Input
        }], appearance: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SectionCardComponent, { className: "SectionCardComponent", filePath: "src/app/shared/components/section-card/section-card.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=section-card.component.js.map