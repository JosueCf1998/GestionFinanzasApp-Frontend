import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter-trigger',
  templateUrl: './filter-trigger.component.html',
  styleUrl: './filter-trigger.component.scss',
  standalone: true,
  imports: [IonIcon]
})
export class FilterTriggerComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() caption = '';
  @Input() disabled = false;

  @Output() readonly activated = new EventEmitter<void>();
}
