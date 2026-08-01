import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface CompactListItem {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  amount: number;
  amountPrefix?: string;
  currencySymbol?: string;
  amountTone?: 'default' | 'success';
}

@Component({
  selector: 'app-compact-list-item',
  templateUrl: './compact-list-item.component.html',
  styleUrl: './compact-list-item.component.scss',
  standalone: true,
  imports: [CommonModule, ItemIconComponent]
})
export class CompactListItemComponent {
  @Input({ required: true }) item!: CompactListItem;
  @Input() interactive = false;

  @Output() readonly activated = new EventEmitter<void>();

  activate(): void {
    if (this.interactive) this.activated.emit();
  }
}
