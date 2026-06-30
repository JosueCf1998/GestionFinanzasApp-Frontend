import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';

import { ButtonComponent } from '../button/button.component';

/* ==========================================================
   ENUMS
   ========================================================== */

export enum AccountSelectionMode {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

/* ==========================================================
   COMPONENT
   ========================================================== */

@Component({
  selector: 'app-account-selector-modal',
  templateUrl: './account-selector-modal.component.html',
  styleUrls: ['./account-selector-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ButtonComponent
  ]
})
export class AccountSelectorModalComponent implements OnChanges {

  /* ==========================================================
     INPUTS
     ========================================================== */

  @Input() isOpen = false;
  @Input() accounts: Accounts[] = [];
  @Input() selectionMode = AccountSelectionMode.SINGLE;
  @Input() selectedAccount: Accounts | null = null;
  @Input() selectedAccounts: Accounts[] = [];

  /* ==========================================================
     OUTPUTS
     ========================================================== */

  @Output() readonly accountSelected = new EventEmitter<Accounts>();
  @Output() readonly accountsSelected = new EventEmitter<Accounts[]>();
  @Output() readonly modalClosed = new EventEmitter<void>();

  /* ==========================================================
     PROPERTIES
     ========================================================== */

  readonly AccountSelectionMode = AccountSelectionMode;

  private workingSelection: Accounts[] = [];

  /* ==========================================================
     LIFECYCLE
     ========================================================== */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.workingSelection = [...this.selectedAccounts];
    }
  }

  /* ==========================================================
     GETTERS
     ========================================================== */

  get selectAll(): boolean {
    return this.accounts.length > 0 &&
      this.workingSelection.length === this.accounts.length;
  }

  /* ==========================================================
     PUBLIC
     ========================================================== */

  getModalClass(): string {
    switch (this.accounts.length) {
      case 1:
        return 'custom-modal modal-small';
      case 2:
        return 'custom-modal modal-medium';
      case 3:
        return 'custom-modal modal-large';
      default:
        return 'custom-modal modal-xlarge';
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }

  isSelected(account: Accounts): boolean {
    if (this.selectionMode === AccountSelectionMode.SINGLE) {
      return this.selectedAccount?.id === account.id;
    }

    return this.workingSelection.some(item => item.id === account.id);
  }

  selectAccount(account: Accounts): void {
    if (this.selectionMode === AccountSelectionMode.SINGLE) {
      this.accountSelected.emit(account);
      this.closeModal();
      return;
    }

    const index = this.workingSelection.findIndex(item => item.id === account.id);

    if (index >= 0) {
      this.workingSelection.splice(index, 1);
    } else {
      this.workingSelection.push(account);
    }
  }

  toggleSelectAll(): void {
    this.workingSelection = this.selectAll
      ? []
      : [...this.accounts];
  }

  confirmSelection(): void {
    this.accountsSelected.emit([...this.workingSelection]);
    this.closeModal();
  }
}
