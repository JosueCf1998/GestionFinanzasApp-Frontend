import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { KeyValueItem, KeyValueListComponent } from '../key-value-list/key-value-list.component';

export type SuccessReceiptDetail = KeyValueItem;

@Component({
  selector: 'app-success-receipt-modal',
  templateUrl: './success-receipt-modal.component.html',
  styleUrls: ['./success-receipt-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, BaseModalComponent, KeyValueListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessReceiptModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Operación realizada';
  @Input() eyebrow = '¡Operación exitosa!';
  @Input() heading = '';
  @Input() actionText = 'Continuar';
  @Input() details: SuccessReceiptDetail[] = [];

  @Output() readonly completed = new EventEmitter<void>();

  modalOpen = false;
  modalAnimated = true;
  private shouldComplete = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isOpen']) return;

    this.modalOpen = this.isOpen;
    if (this.isOpen) {
      this.modalAnimated = true;
      this.shouldComplete = false;
    }
  }

  requestCompletion(): void {
    this.shouldComplete = true;
    this.modalAnimated = false;
    this.modalOpen = false;
  }

  handleClosed(): void {
    if (!this.shouldComplete) return;

    this.shouldComplete = false;
    this.completed.emit();
  }
}
