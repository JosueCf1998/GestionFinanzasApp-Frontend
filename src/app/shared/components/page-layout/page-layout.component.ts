import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    CommonModule,
    ItemIconComponent
  ],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent {

  /* ==========================================================
   * INPUTS
   * ========================================================== */

  @Input()
  title = '';

  @Input()
  subtitle = '';

  @Input()
  showBack = true;

  @Input()
  loading = false;

  /* ==========================================================
   * OUTPUTS
   * ========================================================== */

  @Output()
  back = new EventEmitter<void>();

  /* ==========================================================
   * STATE
   * ========================================================== */

  private navigating = false;

  /* ==========================================================
   * EVENTS
   * ========================================================== */

  onBack(): void {

    if (
      this.loading ||
      this.navigating
    ) {
      return;
    }

    this.navigating = true;

    this.back.emit();

    setTimeout(() => {

      this.navigating = false;

    }, 600);

  }

}
