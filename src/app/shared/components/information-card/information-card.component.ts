import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KeyValueItem, KeyValueListComponent } from '../key-value-list/key-value-list.component';
import { SectionCardComponent } from '../section-card/section-card.component';

export type InformationCardItem = KeyValueItem;

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
  standalone: true,
  imports: [KeyValueListComponent, SectionCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationCardComponent {
  @Input() title = 'Información';
  @Input({ required: true }) items: InformationCardItem[] = [];
}
