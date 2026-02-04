import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';

@Component({
  selector: 'app-account-selector-modal',
  templateUrl: './account-selector-modal.component.html',
  styleUrls: ['./account-selector-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AccountSelectorModalComponent {
  @Input() isOpen: boolean = false;
  @Input() accounts: Accounts[] = [];
  @Input() selectedAccountId: string | null = null;
  @Output() accountSelected = new EventEmitter<Accounts>();
  @Output() modalClosed = new EventEmitter<void>();

  selectedAccount: Accounts | null = null;

  getModalClass(): string {
    const numCuentas = this.accounts.length;
    if (numCuentas === 1) return 'custom-modal modal-small';
    if (numCuentas === 2) return 'custom-modal modal-medium';
    if (numCuentas === 3) return 'custom-modal modal-large';
    return 'custom-modal modal-xlarge';
  }

  closeModal() {
    this.selectedAccount = null;
    this.modalClosed.emit();
  }

  selectAccount(account: Accounts) {
    this.selectedAccount = account;
    this.accountSelected.emit(account);
    this.closeModal();
  }
}
