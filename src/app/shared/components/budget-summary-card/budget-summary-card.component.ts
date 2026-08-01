import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BudgetStatus } from 'src/app/core/models/budgets/list-budgets.model';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';

export type BudgetSummaryCardMode = 'period' | 'budget';
export type BudgetSummaryCardAppearance = 'layered' | 'classic';

@Component({
  selector: 'app-budget-summary-card',
  templateUrl: './budget-summary-card.component.html',
  styleUrls: ['./budget-summary-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, ItemIconComponent, CircularProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSummaryCardComponent {
  @Input() mode: BudgetSummaryCardMode = 'period';
  @Input() appearance: BudgetSummaryCardAppearance = 'layered';
  @Input() title = '';
  @Input() headline = '';
  @Input() dateRange = '';
  @Input() icon = 'wallet';
  @Input() color = '#ffffff';
  @Input() status: BudgetStatus = 'ON_TRACK';
  @Input() statusLabel = '';
  @Input() progress = 0;
  @Input() budgeted = 0;
  @Input() used = 0;
  @Input() balance = 0;
  @Input() balanceLabel = 'Disponible';
  @Input() currencySymbol = 'S/';

  get showBalance(): boolean {
    return this.mode === 'budget';
  }
}
