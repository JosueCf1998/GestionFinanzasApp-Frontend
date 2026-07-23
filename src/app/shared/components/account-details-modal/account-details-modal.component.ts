import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface AccountDetailsItem {
  id: number;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-account-details-modal',
  templateUrl: './account-details-modal.component.html',
  styleUrls: ['./account-details-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseModalComponent, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsModalComponent {
  @Input() isOpen = false;
  @Input() accounts: AccountDetailsItem[] = [];
  @Input() currency = 'PEN';

  @Output() readonly closed = new EventEmitter<void>();

  trackByAccount(_: number, account: AccountDetailsItem): number {
    return account.id;
  }
}
