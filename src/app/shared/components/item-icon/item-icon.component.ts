import { Component, Input } from '@angular/core';

/* ==========================================================
   TYPES
   ========================================================== */

export type ItemIconSize = 'sm' | 'md' | 'lg';
export type ItemIconShape = 'rounded' | 'circle';
export type ItemIconVariant = 'solid' | 'soft';

/* ==========================================================
   COMPONENT
   ========================================================== */

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss'],
  standalone: true,
  imports: []
})
export class ItemIconComponent {

  /* ==========================================================
     INPUTS
     ========================================================== */

  @Input() icon = '';
  @Input() color = 'var(--fv-primary)';
  @Input() size: ItemIconSize = 'md';
  @Input() shape: ItemIconShape = 'rounded';
  @Input() variant: ItemIconVariant = 'solid';
  @Input() selected = false;
  @Input() disabled = false;

}
