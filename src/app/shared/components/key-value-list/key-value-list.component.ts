import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface KeyValueItem {
  label: string;
  value: string;
  emphasis?: boolean;
  wrap?: boolean;
}

@Component({ selector: 'app-key-value-list', templateUrl: './key-value-list.component.html', styleUrls: ['./key-value-list.component.scss'], standalone: true, imports: [NgFor], changeDetection: ChangeDetectionStrategy.OnPush })
export class KeyValueListComponent {
  @Input({ required: true }) items: KeyValueItem[] = [];
  @Input() appearance: 'plain' | 'outlined' = 'plain';
}
