import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    slot: 'fixed'
  }
})
export class FloatingActionButtonComponent {
  @Input() icon = 'add';
  @Input() ariaLabel = 'Agregar';
  @Input() disabled = false;

  @Output() readonly clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) this.clicked.emit();
  }
}
