import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class CircularProgressComponent {
    constructor() {
        this.progress = 0;
        this.label = 'Utilizado';
        this.ariaLabel = 'Porcentaje utilizado';
        this.size = 'md';
    }
    get normalizedProgress() {
        return Math.min(Math.max(Number(this.progress) || 0, 0), 100);
    }
    get progressLabel() {
        const progress = Math.max(Number(this.progress) || 0, 0);
        if (progress > 999)
            return '999%+';
        return `${new Intl.NumberFormat('es-PE', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(progress)}%`;
    }
    static { this.ɵfac = function CircularProgressComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CircularProgressComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CircularProgressComponent, selectors: [["app-circular-progress"]], inputs: { progress: "progress", label: "label", ariaLabel: "ariaLabel", size: "size" }, decls: 6, vars: 8, consts: [["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "circular-progress"], [1, "circular-progress__content"]], template: function CircularProgressComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "strong");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "span");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--progress", ctx.normalizedProgress + "%");
            i0.ɵɵclassProp("circular-progress--sm", ctx.size === "sm");
            i0.ɵɵattribute("aria-label", ctx.ariaLabel)("aria-valuenow", ctx.progress);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.progressLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.label);
        } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n  justify-self: end;\n}\n\n.circular-progress[_ngcontent-%COMP%] {\n  --progress: 0%;\n  display: grid;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  background: conic-gradient(\n    #fff 0%,\n    #a5b4fc var(--progress),\n    rgba(255, 255, 255, .16) var(--progress)\n  );\n  box-shadow: 0 8px 18px rgba(24, 10, 83, .18);\n  place-items: center;\n}\n\n.circular-progress[_ngcontent-%COMP%]::before {\n  grid-area: 1 / 1;\n  width: 62px;\n  height: 62px;\n  border-radius: 50%;\n  background: #3b218f;\n  content: '';\n}\n\n.circular-progress__content[_ngcontent-%COMP%] {\n  z-index: 1;\n  grid-area: 1 / 1;\n  text-align: center;\n}\n\n.circular-progress[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.circular-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.circular-progress[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 16px;\n  letter-spacing: -.025em;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.circular-progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  color: rgba(255, 255, 255, .7);\n  font-size: var(--fv-type-caption-2);\n}\n\n.circular-progress--sm[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n}\n\n.circular-progress--sm[_ngcontent-%COMP%]::before {\n  width: 52px;\n  height: 52px;\n}\n\n.circular-progress--sm[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.circular-progress--sm[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n\n@media (max-width: 360px) {\n  .circular-progress[_ngcontent-%COMP%]:not(.circular-progress--sm) {\n    width: 68px;\n    height: 68px;\n  }\n\n  .circular-progress[_ngcontent-%COMP%]:not(.circular-progress--sm)::before {\n    width: 56px;\n    height: 56px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CircularProgressComponent, [{
        type: Component,
        args: [{ selector: 'app-circular-progress', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"circular-progress\"\n  [class.circular-progress--sm]=\"size === 'sm'\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n  [attr.aria-valuenow]=\"progress\"\n  [style.--progress]=\"normalizedProgress + '%'\">\n  <div class=\"circular-progress__content\">\n    <strong>{{ progressLabel }}</strong>\n    <span>{{ label }}</span>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n  justify-self: end;\n}\n\n.circular-progress {\n  --progress: 0%;\n  display: grid;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  background: conic-gradient(\n    #fff 0%,\n    #a5b4fc var(--progress),\n    rgba(255, 255, 255, .16) var(--progress)\n  );\n  box-shadow: 0 8px 18px rgba(24, 10, 83, .18);\n  place-items: center;\n}\n\n.circular-progress::before {\n  grid-area: 1 / 1;\n  width: 62px;\n  height: 62px;\n  border-radius: 50%;\n  background: #3b218f;\n  content: '';\n}\n\n.circular-progress__content {\n  z-index: 1;\n  grid-area: 1 / 1;\n  text-align: center;\n}\n\n.circular-progress strong,\n.circular-progress span {\n  display: block;\n}\n\n.circular-progress strong {\n  color: #fff;\n  font-size: 16px;\n  letter-spacing: -.025em;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.circular-progress span {\n  margin-top: 3px;\n  color: rgba(255, 255, 255, .7);\n  font-size: var(--fv-type-caption-2);\n}\n\n.circular-progress--sm {\n  width: 64px;\n  height: 64px;\n}\n\n.circular-progress--sm::before {\n  width: 52px;\n  height: 52px;\n}\n\n.circular-progress--sm strong {\n  font-size: 14px;\n}\n\n.circular-progress--sm span {\n  margin-top: 2px;\n}\n\n@media (max-width: 360px) {\n  .circular-progress:not(.circular-progress--sm) {\n    width: 68px;\n    height: 68px;\n  }\n\n  .circular-progress:not(.circular-progress--sm)::before {\n    width: 56px;\n    height: 56px;\n  }\n}\n"] }]
    }], null, { progress: [{
            type: Input
        }], label: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CircularProgressComponent, { className: "CircularProgressComponent", filePath: "src/app/shared/components/circular-progress/circular-progress.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=circular-progress.component.js.map