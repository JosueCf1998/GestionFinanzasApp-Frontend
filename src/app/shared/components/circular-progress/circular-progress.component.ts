import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CircularProgressSize = 'sm' | 'md';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularProgressComponent {
  @Input() progress = 0;
  @Input() label = 'Utilizado';
  @Input() ariaLabel = 'Porcentaje utilizado';
  @Input() size: CircularProgressSize = 'md';

  get normalizedProgress(): number {
    return Math.min(Math.max(Number(this.progress) || 0, 0), 100);
  }

  get progressLabel(): string {
    const progress = Math.max(Number(this.progress) || 0, 0);
    if (progress > 999) return '999%+';

    return `${new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(progress)}%`;
  }
}
