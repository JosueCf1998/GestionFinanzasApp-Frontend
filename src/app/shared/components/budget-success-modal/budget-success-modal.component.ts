import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-budget-success-modal',
  templateUrl: './budget-success-modal.component.html',
  styleUrls: ['./budget-success-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, BaseModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSuccessModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() budgetName = '';
  @Input() budgetTotal = 0;
  @Input() dateRange = '';
  @Input() accountsLabel = '';
  @Input() categoriesLabel = '';
  @Input() note = '';

  @Output() readonly viewBudgets = new EventEmitter<void>();

  modalOpen = false;
  private shouldNavigate = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      this.modalOpen = this.isOpen;
    }
  }

  requestViewBudgets(): void {
    this.shouldNavigate = true;
    this.modalOpen = false;
  }

  handleClosed(): void {
    if (this.shouldNavigate) {
      this.shouldNavigate = false;
      this.viewBudgets.emit();
    }
  }
}
