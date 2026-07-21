import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface SelectionSummaryItem {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export type SelectionSummaryTone = 'blue' | 'primary';

@Component({
  selector: 'app-selection-summary',
  templateUrl: './selection-summary.component.html',
  styleUrls: ['./selection-summary.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionSummaryComponent {
  @Input({ required: true }) primaryText = '';
  @Input({ required: true }) secondaryText = '';
  @Input({ required: true }) ariaLabel = '';
  @Input() fallbackIcon = '';
  @Input() tone: SelectionSummaryTone = 'blue';
  @Input() items: SelectionSummaryItem[] = [];

  @Output() readonly activated = new EventEmitter<void>();

  get visibleItems(): SelectionSummaryItem[] {
    return this.items.slice(0, 3);
  }

  get fallbackIconName(): string {
    return this.fallbackIcon.split('/').pop()?.replace(/\.svg$/i, '') ?? '';
  }

  get fallbackIconColor(): string {
    return this.tone === 'primary'
      ? 'var(--fv-primary, #3a0ca3)'
      : 'var(--fv-primary-light, #4361ee)';
  }
}
