import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-skeleton',
  templateUrl: './list-skeleton.component.html',
  styleUrl: './list-skeleton.component.scss',
  standalone: true
})
export class ListSkeletonComponent {
  private rowItems = Array.from({ length: 4 }, (_, index) => index);

  @Input()
  set rows(value: number) {
    const length = Number.isFinite(value)
      ? Math.min(Math.max(Math.trunc(value), 1), 10)
      : 4;
    this.rowItems = Array.from({ length }, (_, index) => index);
  }

  get items(): number[] {
    return this.rowItems;
  }
}
