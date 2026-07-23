import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomChartComponent } from "../../../shared/components/custom-chart/custom-chart.component";
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/common";
const _c0 = () => ["#5e9c87", "#f7c948", "#6cb2eb", "#f86c6b"];
function GraphicsPage_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "ion-text", 11)(2, "small");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Fecha: ", i0.ɵɵpipeBind2(4, 2, ctx_r1.selectedMonthForWeek, "2.0"), "/", ctx_r1.selectedYearForWeek, " ");
} }
function GraphicsPage_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "app-custom-chart", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("series", ctx_r1.chartOptions.series)("categories", ctx_r1.chartOptions.xaxis.categories)("chartType", "bar")("colors", i0.ɵɵpureFunction0(4, _c0));
} }
function GraphicsPage_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-text", 14)(1, "p");
    i0.ɵɵtext(2, "No hay datos para mostrar.");
    i0.ɵɵelementEnd()();
} }
export class GraphicsPage {
    constructor() {
        // Filtros seleccionados
        this.selectedTab = 'general';
        this.selectedPeriod = 'anio';
        // Etiquetas auxiliares para mostrar en la vista
        this.selectedMonthForWeek = null;
        this.selectedYearForWeek = null;
        // Opciones de tabs
        this.mainTabs = [
            { value: 'general', label: 'General' },
            { value: 'gastos', label: 'Gastos' },
            { value: 'ingresos', label: 'Ingresos' }
        ];
        this.periodTabs = [
            { value: 'anio', label: 'Por año' },
            { value: 'mes', label: 'Por mes' },
            { value: 'semana', label: 'Por semana' },
            { value: 'dia', label: 'Por día' }
        ];
        // Datos de ejemplo
        this.chartData = [
            { year: 2023, month: null, week: null, day: null, ingresos: 12000, gastos: 9000, beneficio: 3000, perdida: 0 },
            { year: 2024, month: null, week: null, day: null, ingresos: 15000, gastos: 11000, beneficio: 4000, perdida: 0 },
            { year: 2024, month: 4, week: null, day: null, ingresos: 4000, gastos: 3000, beneficio: 1000, perdida: 0 },
            { year: 2024, month: 5, week: null, day: null, ingresos: 5000, gastos: 3500, beneficio: 1500, perdida: 0 },
            { year: 2024, month: 4, week: 1, day: null, ingresos: 1000, gastos: 700, beneficio: 300, perdida: 0 },
            { year: 2024, month: 4, week: 2, day: null, ingresos: 1200, gastos: 900, beneficio: 300, perdida: 0 },
            { year: 2024, month: 5, week: 1, day: null, ingresos: 1300, gastos: 1000, beneficio: 300, perdida: 0 },
            { year: 2024, month: 4, week: 2, day: 8, ingresos: 200, gastos: 150, beneficio: 50, perdida: 0 },
            { year: 2024, month: 4, week: 2, day: 9, ingresos: 180, gastos: 120, beneficio: 60, perdida: 0 },
            { year: 2024, month: 4, week: 2, day: 10, ingresos: 220, gastos: 180, beneficio: 40, perdida: 0 }
        ];
        this.updateChart();
    }
    // Actualiza los datos del gráfico según los filtros seleccionados
    updateChart() {
        let filteredData = [];
        let categories = [];
        // Filtrado de datos y categorías según el periodo
        switch (this.selectedPeriod) {
            case 'anio':
                filteredData = this.chartData.filter(d => d.month === null && d.week === null && d.day === null);
                categories = filteredData.map(d => d.year.toString());
                break;
            case 'mes':
                filteredData = this.chartData.filter(d => d.month !== null && d.week === null && d.day === null);
                categories = filteredData.map(d => `${('0' + d.month).slice(-2)}-${d.year}`);
                break;
            case 'semana':
                filteredData = this.chartData.filter(d => d.week !== null && d.day === null);
                categories = filteredData.map(d => `${d.week}s/${('0' + d.month).slice(-2)}`);
                this.selectedMonthForWeek = filteredData.length > 0 ? filteredData[0].month : null;
                this.selectedYearForWeek = filteredData.length > 0 ? filteredData[0].year : null;
                break;
            case 'dia':
                filteredData = this.chartData.filter(d => d.day !== null);
                categories = filteredData.map(d => `${('0' + d.day).slice(-2)}/${('0' + d.month).slice(-2)}`);
                break;
        }
        // Series según el tab seleccionado
        let series = [];
        if (this.selectedTab === 'general') {
            series = [
                { name: "Ingresos", data: filteredData.map(d => d.ingresos) },
                { name: "Gastos", data: filteredData.map(d => d.gastos) },
                { name: "Beneficio", data: filteredData.map(d => d.beneficio) },
                { name: "Pérdida", data: filteredData.map(d => d.perdida) }
            ];
        }
        else if (this.selectedTab === 'gastos') {
            series = [{ name: "Gastos", data: filteredData.map(d => d.gastos) }];
        }
        else if (this.selectedTab === 'ingresos') {
            series = [{ name: "Ingresos", data: filteredData.map(d => d.ingresos) }];
        }
        this.chartOptions = {
            series,
            xaxis: {
                categories,
                labels: {
                    style: { fontSize: "13px", colors: "#666" }
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            }
        };
    }
    static { this.ɵfac = function GraphicsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GraphicsPage)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GraphicsPage, selectors: [["app-graphics"]], decls: 11, vars: 8, consts: [["noData", ""], ["scroll-y", "false", 3, "fullscreen"], [1, "content"], ["title", "Gr\u00E1ficos", "description", "Analiza la evoluci\u00F3n y distribuci\u00F3n de tus movimientos.", "imageSrc", "assets/image/graphics-header.svg", "imageAlt", "Gr\u00E1fico financiero"], [1, "filter-container"], ["segmentClass", "main-tabs", 3, "modelChange", "options", "model"], ["segmentClass", "period-tabs", 3, "modelChange", "options", "model"], [1, "chart-card"], ["class", "year-label", 4, "ngIf"], ["class", "apex-wrapper", 4, "ngIf", "ngIfElse"], [1, "year-label"], ["color", "medium"], [1, "apex-wrapper"], [3, "series", "categories", "chartType", "colors"], ["color", "medium", 1, "no-data-text"]], template: function GraphicsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ion-content", 1)(1, "div", 2);
            i0.ɵɵelement(2, "app-feature-header", 3);
            i0.ɵɵelementStart(3, "div", 4)(4, "app-custom-segment", 5);
            i0.ɵɵtwoWayListener("modelChange", function GraphicsPage_Template_app_custom_segment_modelChange_4_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.selectedTab, $event) || (ctx.selectedTab = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("modelChange", function GraphicsPage_Template_app_custom_segment_modelChange_4_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.updateChart()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "app-custom-segment", 6);
            i0.ɵɵtwoWayListener("modelChange", function GraphicsPage_Template_app_custom_segment_modelChange_5_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.selectedPeriod, $event) || (ctx.selectedPeriod = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("modelChange", function GraphicsPage_Template_app_custom_segment_modelChange_5_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.updateChart()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 7);
            i0.ɵɵtemplate(7, GraphicsPage_div_7_Template, 5, 5, "div", 8)(8, GraphicsPage_div_8_Template, 2, 5, "div", 9)(9, GraphicsPage_ng_template_9_Template, 3, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            const noData_r3 = i0.ɵɵreference(10);
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.mainTabs);
            i0.ɵɵtwoWayProperty("model", ctx.selectedTab);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.periodTabs);
            i0.ɵɵtwoWayProperty("model", ctx.selectedPeriod);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "semana" && ctx.selectedMonthForWeek && ctx.selectedYearForWeek);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.chartData && ctx.chartData.length > 0)("ngIfElse", noData_r3);
        } }, dependencies: [IonicModule, i1.IonContent, i1.IonText, CommonModule, i2.NgIf, i2.DecimalPipe, FormsModule,
            NgApexchartsModule,
            CustomChartComponent,
            CustomSegmentComponent,
            FeatureHeaderComponent], styles: ["//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Estructura[_ngcontent-%COMP%]   Base\n//[_ngcontent-%COMP%]   ====================\n\nhtml[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  overflow: hidden !important;\n  height: 100%;\n}\n\nion-content[_ngcontent-%COMP%] {\n  --overflow: hidden;\n  overflow-y: hidden !important;\n  overflow-x: hidden !important;\n  overscroll-behavior: none;\n  touch-action: none;\n  --padding-bottom: 0;\n  --padding-top: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --margin-bottom: 0;\n  --margin-top: 0;\n  scrollbar-width: none !important; \n\n}\n\nion-content[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::-webkit-scrollbar, \nion-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0 !important;\n  height: 0 !important;\n  display: none !important;\n  background: transparent !important;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Estructura[_ngcontent-%COMP%]   Vista\n//[_ngcontent-%COMP%]   ====================\n\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%);\n  min-height: 100dvh;\n  height: 100dvh;\n  max-height: 100dvh;\n  box-sizing: border-box;\n  margin-top: 16px;\n  padding: 0 16px 16px 16px;\n  overflow: hidden !important;\n}\n\n.filter-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.chart-container[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 20px;\n  margin: 24px 12px;\n  padding: 16px 8px 8px 8px;\n  box-shadow: 0 2px 8px #0001;\n}\n\n.graphics-content[_ngcontent-%COMP%] {\n  --background: #f8faf9;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 22px;\n  padding: 4px;\n  box-shadow: 0 4px 16px #0001;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Tabs\n//[_ngcontent-%COMP%]   ====================\n\n.main-tabs[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  --background: #f3f7f5;\n  --indicator-color: #5e9c87;\n}\n\n.period-tabs[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n  --background: #f8faf9;\n  --indicator-color: #5e9c87;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Gr\u00E1ficos[_ngcontent-%COMP%]   y[_ngcontent-%COMP%]   Leyendas\n//[_ngcontent-%COMP%]   ====================\n\n.apex-wrapper[_ngcontent-%COMP%] {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n\n.legend[_ngcontent-%COMP%], \n.legend-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  font-size: 14px;\n}\n\n.legend[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n  margin-top: 12px;\n}\n\n.legend-row[_ngcontent-%COMP%] {\n  justify-content: center;\n  margin-top: 10px;\n  gap: 18px;\n  font-size: 15px;\n  color: #7a7a7a;\n}\n\n.legend-item[_ngcontent-%COMP%], \n.legend-dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.legend-item[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  margin-right: 4px;\n}\n\n.legend-dot[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  margin-right: 5px;\n}\n\n.legend-dot.ingresos[_ngcontent-%COMP%] { background: #5e9c87; }\n.legend-dot.gastos[_ngcontent-%COMP%]   { background: #f7c948; }\n.legend-dot.beneficio[_ngcontent-%COMP%] { background: #6cb2eb; }\n.legend-dot.perdida[_ngcontent-%COMP%]   { background: #f86c6b; }\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Otros\n//[_ngcontent-%COMP%]   ====================\n\n.no-data-text[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 30px 0 10px 0;\n  font-size: 1.1em;\n}\n\n.year-label[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 8px;\n  font-size: 1em;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GraphicsPage, [{
        type: Component,
        args: [{ selector: 'app-graphics', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    NgApexchartsModule,
                    CustomChartComponent,
                    CustomSegmentComponent,
                    FeatureHeaderComponent
                ], template: "<ion-content [fullscreen]=\"true\" scroll-y=\"false\">\n  <div class=\"content\">\n\n    <app-feature-header\n      title=\"Gr\u00E1ficos\"\n      description=\"Analiza la evoluci\u00F3n y distribuci\u00F3n de tus movimientos.\"\n      imageSrc=\"assets/image/graphics-header.svg\"\n      imageAlt=\"Gr\u00E1fico financiero\">\n    </app-feature-header>\n\n    <!-- Filtros -->\n    <div class=\"filter-container\">\n      <app-custom-segment\n        [options]=\"mainTabs\"\n        [(model)]=\"selectedTab\"\n        segmentClass=\"main-tabs\"\n        (modelChange)=\"updateChart()\">\n      </app-custom-segment>\n      <app-custom-segment\n        [options]=\"periodTabs\"\n        [(model)]=\"selectedPeriod\"\n        segmentClass=\"period-tabs\"\n        (modelChange)=\"updateChart()\">\n      </app-custom-segment>\n    </div>\n\n    <!-- Gr\u00E1fica -->\n    <div class=\"chart-card\">\n      <div\n        *ngIf=\"selectedPeriod === 'semana' && selectedMonthForWeek && selectedYearForWeek\"\n        class=\"year-label\">\n        <ion-text color=\"medium\">\n          <small>\n            Fecha: {{ selectedMonthForWeek | number:'2.0' }}/{{ selectedYearForWeek }}\n          </small>\n        </ion-text>\n      </div>\n\n      <div *ngIf=\"chartData && chartData.length > 0; else noData\" class=\"apex-wrapper\">\n        <app-custom-chart\n          [series]=\"chartOptions.series\"\n          [categories]=\"chartOptions.xaxis.categories\"\n          [chartType]=\"'bar'\"\n          [colors]=\"['#5e9c87', '#f7c948', '#6cb2eb', '#f86c6b']\">\n        </app-custom-chart>\n      </div>\n      <ng-template #noData>\n        <ion-text color=\"medium\" class=\"no-data-text\">\n          <p>No hay datos para mostrar.</p>\n        </ion-text>\n      </ng-template>\n    </div>\n\n  </div>\n</ion-content>\n", styles: ["// ====================\n// Estructura Base\n// ====================\n\nhtml, body {\n  overflow: hidden !important;\n  height: 100%;\n}\n\nion-content {\n  --overflow: hidden;\n  overflow-y: hidden !important;\n  overflow-x: hidden !important;\n  overscroll-behavior: none;\n  touch-action: none;\n  --padding-bottom: 0;\n  --padding-top: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --margin-bottom: 0;\n  --margin-top: 0;\n  scrollbar-width: none !important; /* Firefox */\n}\n\nion-content *::-webkit-scrollbar,\nion-content::-webkit-scrollbar {\n  width: 0 !important;\n  height: 0 !important;\n  display: none !important;\n  background: transparent !important;\n}\n\n// ====================\n// Estructura Vista\n// ====================\n\n.content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%);\n  min-height: 100dvh;\n  height: 100dvh;\n  max-height: 100dvh;\n  box-sizing: border-box;\n  margin-top: 16px;\n  padding: 0 16px 16px 16px;\n  overflow: hidden !important;\n}\n\n.filter-container {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.chart-container {\n  background: #fff;\n  border-radius: 20px;\n  margin: 24px 12px;\n  padding: 16px 8px 8px 8px;\n  box-shadow: 0 2px 8px #0001;\n}\n\n.graphics-content {\n  --background: #f8faf9;\n}\n\n.chart-card {\n  background: #fff;\n  border-radius: 22px;\n  padding: 4px;\n  box-shadow: 0 4px 16px #0001;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n\n// ====================\n// Tabs\n// ====================\n\n.main-tabs {\n  margin-bottom: 10px;\n  --background: #f3f7f5;\n  --indicator-color: #5e9c87;\n}\n\n.period-tabs {\n  margin-bottom: 18px;\n  --background: #f8faf9;\n  --indicator-color: #5e9c87;\n}\n\n// ====================\n// Gr\u00E1ficos y Leyendas\n// ====================\n\n.apex-wrapper {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n\n.legend,\n.legend-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  font-size: 14px;\n}\n\n.legend {\n  justify-content: flex-start;\n  margin-top: 12px;\n}\n\n.legend-row {\n  justify-content: center;\n  margin-top: 10px;\n  gap: 18px;\n  font-size: 15px;\n  color: #7a7a7a;\n}\n\n.legend-item,\n.legend-dot {\n  display: inline-block;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.legend-item {\n  width: 12px;\n  height: 12px;\n  margin-right: 4px;\n}\n\n.legend-dot {\n  width: 13px;\n  height: 13px;\n  margin-right: 5px;\n}\n\n.legend-dot.ingresos { background: #5e9c87; }\n.legend-dot.gastos   { background: #f7c948; }\n.legend-dot.beneficio { background: #6cb2eb; }\n.legend-dot.perdida   { background: #f86c6b; }\n\n// ====================\n// Otros\n// ====================\n\n.no-data-text {\n  text-align: center;\n  margin: 30px 0 10px 0;\n  font-size: 1.1em;\n}\n\n.year-label {\n  text-align: center;\n  margin-top: 8px;\n  font-size: 1em;\n}"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(GraphicsPage, { className: "GraphicsPage", filePath: "src/app/features/side-menu/graphics/graphics.page.ts", lineNumber: 31 }); })();
//# sourceMappingURL=graphics.page.js.map