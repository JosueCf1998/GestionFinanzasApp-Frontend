import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  template: `
    <div class="custom-alert-backdrop" (click)="cancel()"></div>
    <div class="custom-alert">
      <div class="custom-alert-header">{{ header }}</div>
      <div class="custom-alert-message">{{ message }}</div>
      <div class="custom-alert-actions">
        <button class="custom-btn cancel" (click)="cancel()">{{ cancelText }}</button>
        <button class="custom-btn confirm" (click)="confirm()">{{ confirmText }}</button>
      </div>
    </div>
  `,
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @Input() header: string = 'Confirmar';
  @Input() message: string = '';
  @Input() cancelText: string = 'No';
  @Input() confirmText: string = 'Sí';
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}