import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  standalone: true,
  imports: [NgIf, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() icon = '';
}
