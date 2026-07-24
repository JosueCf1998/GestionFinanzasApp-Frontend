import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  DonutChartComponent,
  DonutChartSegment
} from '../donut-chart/donut-chart.component';

@Component({
  selector: 'app-period-summary-card',
  templateUrl: './period-summary-card.component.html',
  styleUrl: './period-summary-card.component.scss',
  standalone: true,
  imports: [CommonModule, DonutChartComponent]
})
export class PeriodSummaryCardComponent {
  @Input() title = 'Resumen del período';
  @Input() ariaLabel = 'Resumen del período';
  @Input() periodLabel = 'Período actual';
  @Input() totalLabel = 'Total';
  @Input() totalAmount = 0;
  @Input() currencySymbol = 'S/';
  @Input() amountPrefix = '';
  @Input() metaValue: string | number = '';
  @Input() metaLabel = '';
  @Input() chartSegments: DonutChartSegment[] = [];
  @Input() chartAriaLabel = 'Gráfico de distribución';
  @Input() chartTone: 'primary' | 'success' = 'primary';
}
