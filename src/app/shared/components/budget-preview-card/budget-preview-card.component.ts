import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-budget-preview-card',
  templateUrl: './budget-preview-card.component.html',
  styleUrls: ['./budget-preview-card.component.scss'],
  standalone: true,
  imports: [IonIcon, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetPreviewCardComponent {
  @Input() name = '';
  @Input() icon = 'wallet';
  @Input() color = 'var(--fv-primary)';
  @Input() budgetTotal = 0;
  @Input() categoryCount = 0;
  @Input() startDate = '';
  @Input() endDate = '';

  @Output() readonly personalize = new EventEmitter<void>();

  formatDate(value: string): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Por definir';

    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));
  }

  formatAmount(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number.isFinite(value) ? value : 0);
  }
}
