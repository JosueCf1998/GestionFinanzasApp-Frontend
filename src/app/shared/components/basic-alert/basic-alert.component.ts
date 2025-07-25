import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, NgIf],
})
export class DynamicAlertComponent {
  // Inputs básicos
  @Input() header: string = '';
  @Input() message: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = 'Alert image';
  
  // Configuración de botones
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmText: string = 'Aceptar';
  @Input() showCancel: boolean = true;
  @Input() showConfirm: boolean = true;
  @Input() reverseButtons: boolean = false;
  
  // Estilos personalizables
  @Input() alertSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() cancelButtonClass: string = '';
  @Input() confirmButtonClass: string = '';
  @Input() closeOnBackdrop: boolean = true;
  
  // Eventos
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}