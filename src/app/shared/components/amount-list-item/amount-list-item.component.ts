import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-amount-list-item',
  templateUrl: './amount-list-item.component.html',
  styleUrl: './amount-list-item.component.scss',
  standalone: true,
  imports: [CommonModule, ItemIconComponent]
})
export class AmountListItemComponent {
  private percentageValue: number | null = null;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() color = 'var(--fv-primary)';
  @Input() amount = 0;
  @Input() amountPrefix = '';
  @Input() currencySymbol = 'S/';
  @Input()
  set percentage(value: number | null) {
    this.percentageValue = value === null || !Number.isFinite(value)
      ? null
      : Math.min(Math.max(value, 0), 100);
  }

  get percentage(): number | null {
    return this.percentageValue;
  }
  @Input() amountTone: 'default' | 'success' = 'default';
  @Input() interactive = false;
  @Input() ariaLabel = '';

  @Output() activated = new EventEmitter<void>();

  activate(): void {
    if (this.interactive) this.activated.emit();
  }
}
