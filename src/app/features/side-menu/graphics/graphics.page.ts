import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgApexchartsModule } from "ng-apexcharts";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexTitleSubtitle, ApexLegend, ApexStroke, ApexPlotOptions, ApexTooltip } from "ng-apexcharts";
import { CustomChartComponent } from "../../../shared/components/custom-chart/custom-chart.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  colors?: string[]; // <-- Agrega esta línea
};

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, NgApexchartsModule, CustomChartComponent],
})
export class GraphicsPage {
  selectedTab: string = 'general';
  selectedPeriod: string = 'anio';
  public selectedYearForMonth: number | null = null;
  public selectedMonthForWeek: number | null = null;
  public selectedYearForWeek: number | null = null;

chartData = [
  // Por año
  { year: 2023, month: null, week: null, day: null, ingresos: 12000, gastos: 9000, beneficio: 3000, perdida: 0 },
  { year: 2024, month: null, week: null, day: null, ingresos: 15000, gastos: 11000, beneficio: 4000, perdida: 0 },

  // Por mes (2024)
  { year: 2024, month: 4, week: null, day: null, ingresos: 4000, gastos: 3000, beneficio: 1000, perdida: 0 },
  { year: 2024, month: 5, week: null, day: null, ingresos: 5000, gastos: 3500, beneficio: 1500, perdida: 0 },

  // Por semana (abril y mayo 2024)
  { year: 2024, month: 4, week: 1, day: null, ingresos: 1000, gastos: 700, beneficio: 300, perdida: 0 },
  { year: 2024, month: 4, week: 2, day: null, ingresos: 1200, gastos: 900, beneficio: 300, perdida: 0 },
  { year: 2024, month: 5, week: 1, day: null, ingresos: 1300, gastos: 1000, beneficio: 300, perdida: 0 },

  // Por día (segunda semana de abril 2024)
  { year: 2024, month: 4, week: 2, day: 8, ingresos: 200, gastos: 150, beneficio: 50, perdida: 0 },
  { year: 2024, month: 4, week: 2, day: 9, ingresos: 180, gastos: 120, beneficio: 60, perdida: 0 },
  { year: 2024, month: 4, week: 2, day: 10, ingresos: 220, gastos: 180, beneficio: 40, perdida: 0 }
];

  public chartOptions!: ChartOptions;

  constructor() {
    this.updateChart();
  }

  // Llama este método cada vez que cambie un filtro
  updateChart() {
    // Filtrado según periodo
    let filteredData: any[] = [];
    let categories: string[] = [];
  
    if (this.selectedPeriod === 'anio') {
      filteredData = this.chartData.filter(d => d.month === null && d.week === null && d.day === null);
      categories = filteredData.map(d => d.year.toString());
    } else if (this.selectedPeriod === 'mes') {
      filteredData = this.chartData.filter(d => d.month !== null && d.week === null && d.day === null);
      categories = filteredData.map(d => `${('0' + d.month).slice(-2)}-${d.year}`);
      // Suponiendo que todos los datos de mes son del mismo año
      this.selectedYearForMonth = filteredData.length > 0 ? filteredData[0].year : null;
    } else if (this.selectedPeriod === 'semana') {
      filteredData = this.chartData.filter(d => d.week !== null && d.day === null);
      categories = filteredData.map(d => `${d.week}s/${('0' + d.month).slice(-2)}`);
      this.selectedMonthForWeek = null;
      this.selectedYearForWeek = null;
    } else if (this.selectedPeriod === 'dia') {
      filteredData = this.chartData.filter(d => d.day !== null);
      // Etiqueta multilínea: número y nombre del mes
      categories = filteredData.map(d => `${('0' + d.day).slice(-2)}/${('0' + d.month).slice(-2)}`);    
    } else {
      this.selectedYearForMonth = null;
    }
  
    // Series según el tab seleccionado
    let series: { name: string; data: number[]; }[] = [];
    if (this.selectedTab === 'general') {
      series = [
        { name: "Ingresos", data: filteredData.map(d => d.ingresos) },
        { name: "Gastos", data: filteredData.map(d => d.gastos) },
        { name: "Beneficio", data: filteredData.map(d => d.beneficio) },
        { name: "Pérdida", data: filteredData.map(d => d.perdida) }
      ];
    } else if (this.selectedTab === 'gastos') {
      series = [
        { name: "Gastos", data: filteredData.map(d => d.gastos) }
      ];
    } else if (this.selectedTab === 'ingresos') {
      series = [
        { name: "Ingresos", data: filteredData.map(d => d.ingresos) }
      ];
    }
  
    this.chartOptions = {
      series,
      chart: {
        type: "bar",
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
        text: "Gráficos",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333"
        }
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: "13px",
            colors: "#666"
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "13px",
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
      colors: ["#5e9c87", "#f7c948", "#6cb2eb", "#f86c6b"], // Personaliza los colores de las series
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      }
    };
  }

}