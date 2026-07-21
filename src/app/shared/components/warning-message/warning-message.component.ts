import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.scss'],
  standalone: true,
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningMessageComponent {
  @Input() title = '';
  @Input({ required: true }) message = '';
  @Input() icon = 'assets/icon/alert-triangle.svg';
}
