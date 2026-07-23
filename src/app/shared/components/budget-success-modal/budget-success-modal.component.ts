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
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() budgetName = '';
  @Input() budgetTotal = 0;
  @Input() dateRange = '';
  @Input() accountsLabel = '';
  @Input() categoriesLabel = '';
  @Input() note = '';

  @Output() readonly viewBudgets = new EventEmitter<void>();

  modalOpen = false;
  modalAnimated = true;
  private shouldNavigate = false;

  get modalTitle(): string {
    return this.mode === 'edit' ? 'Presupuesto actualizado' : 'Presupuesto creado';
  }

  get eyebrow(): string {
    return this.mode === 'edit' ? '¡Cambios guardados!' : '¡Presupuesto creado!';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      this.modalOpen = this.isOpen;
      if (this.isOpen) {
        this.modalAnimated = true;
        this.shouldNavigate = false;
      }
    }
  }

  requestViewBudgets(): void {
    this.shouldNavigate = true;
    this.modalAnimated = false;
    this.modalOpen = false;
  }

  handleClosed(): void {
    if (!this.shouldNavigate) return;

    this.shouldNavigate = false;
    this.viewBudgets.emit();
  }
}
