import { Component, Input } from '@angular/core';
import { LearningLessonContent, LearningLessonContentSection } from 'src/app/core/models/learning/learning.model';
import { environment } from 'src/environments/environment';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-lesson-content-renderer',
  standalone: true,
  imports: [ItemIconComponent],
  templateUrl: './lesson-content-renderer.component.html',
  styleUrls: ['./lesson-content-renderer.component.scss']
})
export class LessonContentRendererComponent {
  @Input({ required: true }) section!: LearningLessonContentSection;
  @Input() fallbackTitle = '';

  get item(): LearningLessonContent | null { return this.section.item ?? null; }
  get items(): LearningLessonContent[] { return this.section.items ?? []; }
  resolveImage(value: string | null): string | null {
    if (!value) return null;
    if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('/')) return value;
    if (!value.includes('/') && !value.includes('.')) return `assets/image/${value}.svg`;
    return `${environment.apiUrl.replace(/\/$/, '')}/${value.replace(/^\//, '')}`;
  }
  infoTitle(item: LearningLessonContent): string {
    return item.title?.replace(/^\d+(?:[.,]\d+)?%\s*/, '') || 'Información importante';
  }
  exampleParts(item: LearningLessonContent): { label: string; value: string }[] {
    if (!item.content?.includes('|')) return [];
    return item.content.split('|').map(part => {
      const [label, ...value] = part.trim().split(':');
      return { label: label.trim(), value: value.join(':').trim() };
    }).filter(part => part.label && part.value);
  }
}
