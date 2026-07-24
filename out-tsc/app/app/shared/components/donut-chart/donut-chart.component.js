import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class DonutChartComponent {
    constructor() {
        this.segments = [];
        this.ariaLabel = 'Gráfico de distribución';
        this.tone = 'primary';
    }
    get chartGradient() {
        const distribution = this.segments
            .filter(segment => Number(segment.value) > 0)
            .sort((first, second) => second.value - first.value);
        const total = distribution.reduce((sum, segment) => sum + segment.value, 0);
        if (!distribution.length || total <= 0) {
            return 'conic-gradient(#e8e5f5 0deg 360deg)';
        }
        let accumulated = 0;
        const separatorSize = distribution.length > 1 ? 1.5 : 0;
        const trackColor = '#ffffff';
        const gradientSegments = distribution.map((segment, index) => {
            const start = accumulated;
            accumulated += (segment.value / total) * 360;
            const end = index === distribution.length - 1 ? 360 : accumulated;
            const visibleStart = Math.min(start + separatorSize, end);
            const visibleEnd = Math.max(end - separatorSize, visibleStart);
            const color = this.normalizeColor(segment.color, index);
            return [
                `${trackColor} ${start.toFixed(2)}deg ${visibleStart.toFixed(2)}deg`,
                `${color} ${visibleStart.toFixed(2)}deg ${visibleEnd.toFixed(2)}deg`,
                `${trackColor} ${visibleEnd.toFixed(2)}deg ${end.toFixed(2)}deg`
            ].join(', ');
        });
        return `conic-gradient(from -38deg, ${gradientSegments.join(', ')})`;
    }
    normalizeColor(color, index) {
        const fallbackColors = ['#5932d6', '#3975e8', '#20a46b', '#f49a28', '#e84d72'];
        const normalized = color?.trim().replace(/^(['"])(.*)\1$/, '$2').trim() ?? '';
        if (/^[\da-f]{6}$/i.test(normalized))
            return `#${normalized}`;
        if (/^#[\da-f]{3}([\da-f]{3})?$/i.test(normalized))
            return normalized;
        return fallbackColors[index % fallbackColors.length];
    }
    static { this.ɵfac = function DonutChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DonutChartComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DonutChartComponent, selectors: [["app-donut-chart"]], inputs: { segments: "segments", ariaLabel: "ariaLabel", tone: "tone" }, decls: 2, vars: 5, consts: [["role", "img", 1, "donut-chart"], [1, "donut-chart__ring"]], template: function DonutChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("donut-chart--success", ctx.tone === "success");
            i0.ɵɵattribute("aria-label", ctx.ariaLabel);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background", ctx.chartGradient);
        } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.donut-chart[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  place-items: center;\n}\n\n.donut-chart[_ngcontent-%COMP%]::before {\n  position: absolute;\n  width: 92px;\n  height: 92px;\n  border-radius: 50%;\n  background: rgba(49, 40, 99, .055);\n  filter: blur(14px);\n  content: '';\n}\n\n.donut-chart--success[_ngcontent-%COMP%]::before {\n  background: rgba(22, 163, 106, .055);\n}\n\n.donut-chart__ring[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  width: 112px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: conic-gradient(#e8e5f5 0deg 360deg);\n  box-shadow:\n    0 10px 22px rgba(49, 40, 99, .09),\n    0 2px 5px rgba(49, 40, 99, .045),\n    0 0 0 1px rgba(35, 38, 53, .08),\n    inset 0 1px 0 rgba(255, 255, 255, .32);\n  place-items: center;\n}\n\n.donut-chart__ring[_ngcontent-%COMP%]::before {\n  position: absolute;\n  width: 61%;\n  aspect-ratio: 1;\n  border: 1px solid rgba(224, 226, 232, .9);\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at 38% 28%, #fff 0%, #fefeff 58%, #fafafe 100%);\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, .8),\n    0 2px 7px rgba(49, 40, 99, .055),\n    inset 0 1px 3px rgba(49, 40, 99, .025);\n  content: '';\n}\n\n.donut-chart__ring[_ngcontent-%COMP%]::after {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: conic-gradient(\n    from 205deg,\n    transparent 0deg 92deg,\n    rgba(255, 255, 255, .2) 135deg,\n    transparent 182deg 360deg\n  );\n  content: '';\n  pointer-events: none;\n  -webkit-mask: radial-gradient(circle, transparent 0 61%, #000 62% 100%);\n  mask: radial-gradient(circle, transparent 0 61%, #000 62% 100%);\n}\n\n@media (max-width: 390px) {\n  .donut-chart__ring[_ngcontent-%COMP%] {\n    width: 98px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DonutChartComponent, [{
        type: Component,
        args: [{ selector: 'app-donut-chart', standalone: true, imports: [], template: "<div\n  class=\"donut-chart\"\n  [class.donut-chart--success]=\"tone === 'success'\"\n  role=\"img\"\n  [attr.aria-label]=\"ariaLabel\">\n  <div class=\"donut-chart__ring\" [style.background]=\"chartGradient\"></div>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.donut-chart {\n  position: relative;\n  display: grid;\n  place-items: center;\n}\n\n.donut-chart::before {\n  position: absolute;\n  width: 92px;\n  height: 92px;\n  border-radius: 50%;\n  background: rgba(49, 40, 99, .055);\n  filter: blur(14px);\n  content: '';\n}\n\n.donut-chart--success::before {\n  background: rgba(22, 163, 106, .055);\n}\n\n.donut-chart__ring {\n  position: relative;\n  display: grid;\n  width: 112px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: conic-gradient(#e8e5f5 0deg 360deg);\n  box-shadow:\n    0 10px 22px rgba(49, 40, 99, .09),\n    0 2px 5px rgba(49, 40, 99, .045),\n    0 0 0 1px rgba(35, 38, 53, .08),\n    inset 0 1px 0 rgba(255, 255, 255, .32);\n  place-items: center;\n}\n\n.donut-chart__ring::before {\n  position: absolute;\n  width: 61%;\n  aspect-ratio: 1;\n  border: 1px solid rgba(224, 226, 232, .9);\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at 38% 28%, #fff 0%, #fefeff 58%, #fafafe 100%);\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, .8),\n    0 2px 7px rgba(49, 40, 99, .055),\n    inset 0 1px 3px rgba(49, 40, 99, .025);\n  content: '';\n}\n\n.donut-chart__ring::after {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: conic-gradient(\n    from 205deg,\n    transparent 0deg 92deg,\n    rgba(255, 255, 255, .2) 135deg,\n    transparent 182deg 360deg\n  );\n  content: '';\n  pointer-events: none;\n  -webkit-mask: radial-gradient(circle, transparent 0 61%, #000 62% 100%);\n  mask: radial-gradient(circle, transparent 0 61%, #000 62% 100%);\n}\n\n@media (max-width: 390px) {\n  .donut-chart__ring {\n    width: 98px;\n  }\n}\n"] }]
    }], null, { segments: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], tone: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DonutChartComponent, { className: "DonutChartComponent", filePath: "src/app/shared/components/donut-chart/donut-chart.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=donut-chart.component.js.map