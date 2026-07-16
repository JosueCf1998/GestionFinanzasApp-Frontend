import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomChartComponent } from "../../../shared/components/custom-chart/custom-chart.component";
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { ApexAxisChartSeries, ApexXAxis } from "ng-apexcharts";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    CustomChartComponent,
    CustomSegmentComponent,
    FeatureHeaderComponent
  ],
})
export class GraphicsPage {
  // Filtros seleccionados
  selectedTab: string = 'general';
  selectedPeriod: string = 'anio';

  // Etiquetas auxiliares para mostrar en la vista
  selectedMonthForWeek: number | null = null;
  selectedYearForWeek: number | null = null;

  // Opciones de tabs
  mainTabs = [
    { value: 'general', label: 'General' },
    { value: 'gastos', label: 'Gastos' },
    { value: 'ingresos', label: 'Ingresos' }
  ];
  periodTabs = [
    { value: 'anio', label: 'Por año' },
    { value: 'mes', label: 'Por mes' },
    { value: 'semana', label: 'Por semana' },
    { value: 'dia', label: 'Por día' }
  ];

  // Datos de ejemplo
  chartData = [
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

  chartOptions!: ChartOptions;

  constructor() {
    this.updateChart();
  }

  // Actualiza los datos del gráfico según los filtros seleccionados
  updateChart() {
    let filteredData: any[] = [];
    let categories: string[] = [];

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
    let series: { name: string; data: any[]; }[] = [];
    if (this.selectedTab === 'general') {
      series = [
        { name: "Ingresos", data: filteredData.map(d => d.ingresos) },
        { name: "Gastos", data: filteredData.map(d => d.gastos) },
        { name: "Beneficio", data: filteredData.map(d => d.beneficio) },
        { name: "Pérdida", data: filteredData.map(d => d.perdida) }
      ];
    } else if (this.selectedTab === 'gastos') {
      series = [{ name: "Gastos", data: filteredData.map(d => d.gastos) }];
    } else if (this.selectedTab === 'ingresos') {
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
}
