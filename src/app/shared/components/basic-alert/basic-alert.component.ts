import { CommonModule } from '@angular/common';
import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ElementRef, 
  AfterViewInit, 
  OnDestroy, 
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicAlertComponent implements AfterViewInit, OnDestroy {
  // Inputs básicos
  @Input() header = '';
  @Input() message = '';
  @Input() imageUrl = '';
  @Input() imageAlt = 'Alert image';
  
  // Configuración de botones
  @Input() cancelText = 'Cancelar';
  @Input() confirmText = 'Aceptar';
  @Input() showCancel = true;
  @Input() showConfirm = true;
  @Input() reverseButtons = false;
  
  // Estilos personalizables
  @Input() alertSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() cancelButtonClass = '';
  @Input() confirmButtonClass = '';
  @Input() closeOnBackdrop = true;
  
  // Eventos
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  private previousActiveElement: HTMLElement | null = null;
  private focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.setupFocus();
  }

  ngOnDestroy(): void {
    this.restoreFocus();
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.closeOnBackdrop) {
          event.preventDefault();
          this.cancel();
        }
        break;
      case 'Tab':
        this.trapFocus(event);
        break;
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }

  confirm(): void {
    this.onConfirm.emit();
  }

  private setupFocus(): void {
    // Guardar el elemento que tenía foco antes del modal
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Enfocar el primer botón visible
    requestAnimationFrame(() => {
      this.focusFirstButton();
    });
  }

  private restoreFocus(): void {
    // Restaurar el foco al elemento anterior cuando se cierre el modal
    if (this.previousActiveElement?.focus) {
      requestAnimationFrame(() => {
        this.previousActiveElement?.focus();
      });
    }
  }

  private focusFirstButton(): void {
    const buttons = this.getFocusableElements();
    if (buttons.length > 0) {
      buttons[0].focus();
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      // Shift + Tab - navegación hacia atrás
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab - navegación hacia adelante
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(this.focusableSelector)
    );
  }

  // Getters para optimizar el template
  get ariaLabelledBy(): string | null {
    return this.header ? 'alert-header' : null;
  }

  get ariaDescribedBy(): string | null {
    return this.message ? 'alert-message' : null;
  }

  get cancelAriaLabel(): string {
    return `Botón ${this.cancelText}`;
  }

  get confirmAriaLabel(): string {
    return `Botón ${this.confirmText}`;
  }
}