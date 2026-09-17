import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';

@Component({
  selector: 'app-legal-document-viewer',
  templateUrl: './legal-document-viewer.component.html',
  styleUrls: ['./legal-document-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseModalComponent]
})
export class LegalDocumentViewerComponent {
  @Input() isOpen = false;
  @Input() type: 'privacy' | 'terms' = 'privacy';

  @Output() readonly closed = new EventEmitter<void>();

  get title(): string {
    return this.type === 'privacy' ? 'Política de Privacidad' : 'Términos de Uso';
  }

  get description(): string {
    return 'Actualizado: 01 de julio de 2026';
  }

  onClose(): void {
    this.closed.emit();
  }
}
