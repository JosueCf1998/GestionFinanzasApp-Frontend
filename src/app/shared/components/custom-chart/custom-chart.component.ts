import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";

export type CustomChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  stroke: ApexStroke;
  plotOptions?: ApexPlotOptions;
  tooltip?: ApexTooltip;
  colors?: string[];
};

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class CustomChartComponent implements OnChanges {
  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  @Input() chartType: 'bar' | 'line' | 'area' = 'bar';
  @Input() title: string = '';
  @Input() colors: string[] = ['#5e9c87', '#f7c948', '#6cb2eb', '#f86c6b'];

  chartOptions!: CustomChartOptions;

  ngOnChanges(_: SimpleChanges): void {
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

}