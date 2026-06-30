import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

/* ==========================================================
   TYPES
   ========================================================== */

export type ItemIconSize = 'sm' | 'md' | 'lg';
export type ItemIconShape = 'rounded' | 'circle';

/* ==========================================================
   COMPONENT
   ========================================================== */

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ItemIconComponent {

  /* ==========================================================
     INPUTS
     ========================================================== */

  @Input() icon = '';
  @Input() color = 'var(--fv-primary)';
  @Input() size: ItemIconSize = 'md';
  @Input() shape: ItemIconShape = 'rounded';
  @Input() selected = false;
  @Input() disabled = false;

}
