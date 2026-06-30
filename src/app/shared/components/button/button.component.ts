import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  /* ==========================================================
   * TEXT
   * ========================================================== */

  @Input()
  text = '';

  /* ==========================================================
   * ICON
   * ========================================================== */

  @Input()
  icon?: string;

  /* ==========================================================
   * VARIANT
   * ========================================================== */

  @Input()
  variant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    = 'primary';

  /* ==========================================================
   * TYPE
   * ========================================================== */

  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';

  /* ==========================================================
   * EXPAND
   * ========================================================== */

  @Input()
  expand: 'block' | 'full' = 'block';

  /* ==========================================================
   * STATE
   * ========================================================== */

  @Input()
  disabled = false;

  @Input()
  loading = false;

  /* ==========================================================
   * EVENT
   * ========================================================== */

  @Output()
  clicked = new EventEmitter<void>();

  /* ==========================================================
   * CLICK
   * ========================================================== */

  onClick(): void {

    if (this.disabled || this.loading) {

      return;

    }

    this.clicked.emit();

  }

}
