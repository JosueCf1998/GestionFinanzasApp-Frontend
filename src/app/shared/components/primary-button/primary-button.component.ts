import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {

  @Input()
  text = '';

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Input()
  expand: 'block' | 'full' = 'block';

  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';

  @Output()
  clicked = new EventEmitter<void>();

  onClick(): void {

    if (this.disabled || this.loading) {
      return;
    }

    this.clicked.emit();

  }

}
