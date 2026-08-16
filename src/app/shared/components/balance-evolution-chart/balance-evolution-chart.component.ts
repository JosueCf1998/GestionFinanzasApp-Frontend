import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface BalanceEvolutionChartItem {
  label: string;
  balance: number;
  netMovement: number;
}

@Component({
  selector: 'app-balance-evolution-chart',
  templateUrl: './balance-evolution-chart.component.html',
  styleUrls: ['./balance-evolution-chart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BalanceEvolutionChartComponent {
  @Input() items: BalanceEvolutionChartItem[] = [];
  @Input() balanceLabel = 'Saldo acumulado';
  @Input() movementLabel = 'Movimiento neto';
  @Input() ariaLabel = 'Evolución del saldo acumulado y movimiento neto';

  get maximum(): number {
    const maximum = this.items.reduce(
      (current, item) => Math.max(current, item.balance, item.netMovement),
      0
    );
    if (maximum <= 0) return 100;
    const magnitude = 10 ** Math.floor(Math.log10(maximum));
    return Math.ceil(maximum / magnitude) * magnitude;
  }

  get axisLabels(): number[] {
    return Array.from({ length: 5 }, (_, index) => this.maximum * (1 - index / 4));
  }

  get balancePoints(): string {
    if (!this.items.length) return '';
    return this.items.map((item, index) => {
      const x = ((index + .5) / this.items.length) * 100;
      return `${x.toFixed(2)},${(100 - this.height(item.balance)).toFixed(2)}`;
    }).join(' ');
  }

  height(value: number): number {
    return Math.max(0, Math.min(100, (value / this.maximum) * 100));
  }

  formatAxis(value: number): string {
    if (value >= 1_000_000) return `${this.compact(value / 1_000_000)}M`;
    if (value >= 1_000) return `${this.compact(value / 1_000)}K`;
    return String(Math.round(value));
  }

  trackByIndex(index: number): number { return index; }

  private compact(value: number): string {
    return value.toFixed(Number.isInteger(value) ? 0 : 1);
  }
}
