import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  standalone: true,
  imports: [NgIf, ItemIconComponent]
})
export class EmptyStateComponent {
  @Input() icon = 'bills';
  @Input() title = 'Sin resultados';
  @Input() description = '';
}
