import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  standalone: true,
  imports: [CommonModule, BaseModalComponent, IonIcon],
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @Input() header = 'Confirmar';
  @Input() message = '';
  @Input() cancelText = '';
  @Input() confirmText = '';
  @Input() imageUrl = '';
  @Input() imageAlt = 'Icono de alerta';
  @Input() showCancel = true;
  @Input() showConfirm = true;
  @Input() reverseButtons = false;
  @Input() alertSize: 'small' | 'medium' | 'large' | null = null;
  @Input() closeOnBackdrop: boolean | null = null;
  @Output() readonly onCancel = new EventEmitter<void>();
  @Output() readonly onConfirm = new EventEmitter<void>();

  isOpen = true;
  private pendingAction: 'cancel' | 'confirm' | null = null;

  get modalSize(): 'sm' | 'md' | 'lg' {
    if (this.alertSize === 'medium') return 'md';
    if (this.alertSize === 'large') return 'lg';
    return 'sm';
  }

  get canDismissFromBackdrop(): boolean {
    return this.closeOnBackdrop ?? Boolean(this.showCancel && this.cancelText);
  }

  requestCancel(): void {
    this.pendingAction = 'cancel';
    this.isOpen = false;
  }

  requestConfirm(): void {
    this.pendingAction = 'confirm';
    this.isOpen = false;
  }

  handleClosed(): void {
    const action = this.pendingAction ?? 'cancel';
    this.pendingAction = null;

    if (action === 'confirm') {
      this.onConfirm.emit();
      return;
    }

    this.onCancel.emit();
  }
}
