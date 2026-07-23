import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';

export type ProgressItemStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';

export interface ProgressListItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  percentage: number;
  status: ProgressItemStatus;
}

const STATUS_LABELS: Record<ProgressItemStatus, string> = {
  ON_TRACK: 'En objetivo',
  WARNING: 'Tendencia al exceso',
  EXCEEDED: 'Excedido'
};

@Component({
  selector: 'app-progress-list-item',
  templateUrl: './progress-list-item.component.html',
  styleUrls: ['./progress-list-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, ItemIconComponent]
})
export class ProgressListItemComponent {
  @Input({ required: true }) item!: ProgressListItem;
  @Input() currencySymbol = '';
  @Input() interactive = true;

  @Output() selected = new EventEmitter<ProgressListItem>();

  get statusLabel(): string {
    return STATUS_LABELS[this.item.status];
  }

  select(): void {
    if (!this.interactive) return;
    this.selected.emit(this.item);
  }
}
