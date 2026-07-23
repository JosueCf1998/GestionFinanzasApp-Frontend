import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

export type SectionCardAppearance = 'card' | 'plain';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() appearance: SectionCardAppearance = 'card';
}
