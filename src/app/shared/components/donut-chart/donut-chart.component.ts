import { Component, Input } from '@angular/core';

export interface DonutChartSegment {
  value: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
  standalone: true,
  imports: []
})
export class DonutChartComponent {
  @Input() segments: DonutChartSegment[] = [];
  @Input() ariaLabel = 'Gráfico de distribución';
  @Input() tone: 'primary' | 'success' = 'primary';

  get chartGradient(): string {
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

  private normalizeColor(color: string | null | undefined, index: number): string {
    const fallbackColors = ['#5932d6', '#3975e8', '#20a46b', '#f49a28', '#e84d72'];
    const normalized = color?.trim().replace(/^(['"])(.*)\1$/, '$2').trim() ?? '';

    if (/^[\da-f]{6}$/i.test(normalized)) return `#${normalized}`;
    if (/^#[\da-f]{3}([\da-f]{3})?$/i.test(normalized)) return normalized;

    return fallbackColors[index % fallbackColors.length];
  }
}
