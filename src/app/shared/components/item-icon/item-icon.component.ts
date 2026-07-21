import { Component, Input } from '@angular/core';

/* ==========================================================
   TYPES
   ========================================================== */

export type ItemIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type ItemIconShape = 'rounded' | 'circle';
export type ItemIconVariant = 'solid' | 'soft' | 'glass';

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
  @Input()
  set color(value: string | null | undefined) {
    this.normalizedColor = this.normalizeColor(value);
  }

  get color(): string {
    return this.normalizedColor;
  }

  @Input() size: ItemIconSize = 'md';
  @Input() shape: ItemIconShape = 'rounded';
  @Input() variant: ItemIconVariant = 'solid';
  @Input() selected = false;
  @Input() disabled = false;

  private normalizedColor = 'var(--fv-primary)';

  private normalizeColor(value: string | null | undefined): string {
    if (!value) return 'var(--fv-primary)';

    const normalized = value.trim().replace(/^(['"])(.*)\1$/, '$2').trim();
    if (/^[\da-f]{6}$/i.test(normalized)) return `#${normalized}`;
    if (/^#[\da-f]{3}([\da-f]{3})?$/i.test(normalized)) return normalized;
    if (/^var\(--[\w-]+(?:\s*,[^)]+)?\)$/.test(normalized)) return normalized;

    return 'var(--fv-primary)';
  }

}
