import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

export type InfoBannerTone = 'info' | 'warning';

@Component({
  selector: 'app-info-banner',
  templateUrl: './info-banner.component.html',
  styleUrls: ['./info-banner.component.scss'],
  standalone: true,
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBannerComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) message = '';
  @Input() icon = 'assets/icon/question.svg';
  @Input() symbol = '';
  @Input() tone: InfoBannerTone = 'info';
}
