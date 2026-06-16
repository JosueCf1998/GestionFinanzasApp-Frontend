import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @Input() header: string = 'Confirmar';
  @Input() message: string = '';
  @Input() cancelText: string = '';
  @Input() confirmText: string = '';
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  onBackdropClick() {
    // Solo cerrar con backdrop si hay botón de cancelar
    if (this.cancelText) {
      this.cancel();
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}
