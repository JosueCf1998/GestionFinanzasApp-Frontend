import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface DetailSummaryCardData {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  amount: number;
  currencySymbol?: string;
}

@Component({
  selector: 'app-detail-summary-card',
  templateUrl: './detail-summary-card.component.html',
  styleUrls: ['./detail-summary-card.component.scss'],
  standalone: true,
  imports: [CommonModule, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailSummaryCardComponent {
  @Input({ required: true }) data!: DetailSummaryCardData;
}
