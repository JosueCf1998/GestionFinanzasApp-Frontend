import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PageLayoutComponent {

  @Input()
  title = '';

  @Output()
  back = new EventEmitter<void>();

  onBack(): void {
    this.back.emit();
  }

}
