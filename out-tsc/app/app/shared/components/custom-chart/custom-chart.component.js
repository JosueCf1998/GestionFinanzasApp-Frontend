import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as i0 from "@angular/core";
import * as i1 from "ng-apexcharts";
const _c0 = () => ({});
const _c1 = () => [];
export class CustomChartComponent {
    constructor() {
        this.series = [];
        this.categories = [];
        this.chartType = 'bar';
        this.title = '';
        this.colors = ['#5e9c87', '#f7c948', '#6cb2eb', '#f86c6b'];
    }
    ngOnChanges(_) {
        this.chartOptions = {
            series: this.series,
            chart: {
                type: this.chartType,
                height: 350,
                toolbar: { show: false },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 600,
                    animateGradually: { enabled: true, delay: 150 },
                    dynamicAnimation: { enabled: true, speed: 350 }
                }
            },
            title: {
                text: this.title,
                align: "left",
                style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333"
                }
            },
            xaxis: {
                categories: this.categories,
                labels: {
                    style: {
                        fontSize: "12px",
                        colors: "#666"
                    }
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "12px",
                        colors: "#666"
                    }
                }
            },
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold"
                }
            },
            legend: {
                position: "bottom",
                fontSize: "12px",
                fontWeight: 500,
                labels: { colors: "#444" },
                markers: { width: 16, height: 16, radius: 6 }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: "45%",
                    distributed: false
                }
            },
            tooltip: {
                theme: "light",
                style: {
                    fontSize: "14px"
                }
            },
            colors: this.colors,
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"]
            }
        };
    }
    static { this.ɵfac = function CustomChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomChartComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomChartComponent, selectors: [["app-custom-chart"]], inputs: { series: "series", categories: "categories", chartType: "chartType", title: "title", colors: "colors" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 15, consts: [[3, "series", "chart", "xaxis", "yaxis", "dataLabels", "title", "legend", "stroke", "plotOptions", "tooltip", "colors"]], template: function CustomChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "apx-chart", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("xaxis", ctx.chartOptions.xaxis)("yaxis", ctx.chartOptions.yaxis || i0.ɵɵpureFunction0(11, _c0))("dataLabels", ctx.chartOptions.dataLabels)("title", ctx.chartOptions.title)("legend", ctx.chartOptions.legend)("stroke", ctx.chartOptions.stroke)("plotOptions", ctx.chartOptions.plotOptions || i0.ɵɵpureFunction0(12, _c0))("tooltip", ctx.chartOptions.tooltip || i0.ɵɵpureFunction0(13, _c0))("colors", ctx.chartOptions.colors || i0.ɵɵpureFunction0(14, _c1));
        } }, dependencies: [NgApexchartsModule, i1.ChartComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomChartComponent, [{
        type: Component,
        args: [{ selector: 'app-custom-chart', standalone: true, imports: [NgApexchartsModule], template: "<apx-chart \n  [series]=\"chartOptions.series\"\n  [chart]=\"chartOptions.chart\"\n  [xaxis]=\"chartOptions.xaxis\"\n  [yaxis]=\"chartOptions.yaxis || {}\"\n  [dataLabels]=\"chartOptions.dataLabels\"\n  [title]=\"chartOptions.title\"\n  [legend]=\"chartOptions.legend\"\n  [stroke]=\"chartOptions.stroke\"\n  [plotOptions]=\"chartOptions.plotOptions || {}\"\n  [tooltip]=\"chartOptions.tooltip || {}\"\n  [colors]=\"chartOptions.colors || []\">\n</apx-chart>", styles: [":host {\n  display: block;\n  width: 100%;\n}"] }]
    }], null, { series: [{
            type: Input
        }], categories: [{
            type: Input
        }], chartType: [{
            type: Input
        }], title: [{
            type: Input
        }], colors: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomChartComponent, { className: "CustomChartComponent", filePath: "src/app/shared/components/custom-chart/custom-chart.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=custom-chart.component.js.map