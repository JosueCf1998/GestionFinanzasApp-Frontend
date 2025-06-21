import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-custom-segment',
  templateUrl: './custom-segment.component.html',
  styleUrls: ['./custom-segment.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CustomSegmentComponent {
  @Input() options: Array<{ value: string; label: string }> = [];
  @Input() model: string = '';
  @Input() segmentClass: string = '';
  @Output() modelChange = new EventEmitter<string>();

  onChange(value: string) {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}