import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-alert-backdrop" (click)="onBackdropClick()"></div>
    <div class="custom-alert">
      <div class="custom-alert-content">
        <div class="custom-alert-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <h3 class="custom-alert-header">{{ header }}</h3>
        <p class="custom-alert-message">{{ message }}</p>
        <div class="custom-alert-actions" [class.single-button]="!cancelText || !confirmText">
          <button *ngIf="cancelText" class="custom-btn cancel" (click)="cancel()">
            {{ cancelText }}
          </button>
          <button *ngIf="confirmText" class="custom-btn confirm" (click)="confirm()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
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