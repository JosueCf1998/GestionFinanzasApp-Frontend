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

@Component({
  selector: 'app-selection-summary',
  templateUrl: './selection-summary.component.html',
  styleUrls: ['./selection-summary.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionSummaryComponent {
  readonly fallbackIconColor = 'var(--fv-interactive-icon)';

  @Input({ required: true }) primaryText = '';
  @Input({ required: true }) secondaryText = '';
  @Input({ required: true }) ariaLabel = '';
  @Input() fallbackIcon = '';
  @Input() items: SelectionSummaryItem[] = [];

  @Output() readonly activated = new EventEmitter<void>();

  get visibleItems(): SelectionSummaryItem[] {
    return this.items.slice(0, 3);
  }

  get fallbackIconName(): string {
    return this.fallbackIcon.split('/').pop()?.replace(/\.svg$/i, '') ?? '';
  }

}
