import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type FeatureHeaderVariant = 'default' | 'compact' | 'accent';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() description = '';
  @Input() eyebrow = '';
  @Input() imageSrc = '';
  @Input() imageAlt = '';
  @Input() variant: FeatureHeaderVariant = 'default';
  @Input() headingLevel: 1 | 2 = 1;

  get hostClasses(): Record<string, boolean> {
    return {
      [`feature-header--${this.variant}`]: true,
      'feature-header--without-image': !this.imageSrc
    };
  }
}
