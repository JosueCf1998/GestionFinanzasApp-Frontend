import { Component, Input } from '@angular/core';

export type ItemImageFit = 'contain' | 'cover' | 'fill';
export type ItemImagePosition = 'center' | 'left' | 'right' | 'top' | 'bottom';
export type ItemImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ItemImageFormat = 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp';
@Component({
  selector: 'app-item-image',
  standalone: true,
  templateUrl: './item-image.component.html',
  styleUrls: ['./item-image.component.scss']
})
export class ItemImageComponent {

  @Input() image = '';
  @Input() format: ItemImageFormat = 'svg';
  @Input() alt = '';
  @Input() fit: ItemImageFit = 'cover';
  @Input() position: ItemImagePosition = 'center';
  @Input() radius: ItemImageRadius = 'none';
  @Input() loading: 'eager' | 'lazy' = 'lazy';

  get source(): string {
    return this.image ? `assets/image/${this.image}.${this.format}` : '';
  }

}
