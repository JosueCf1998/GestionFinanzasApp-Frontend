import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CompleteLessonRequest,
  LessonProgressResponse
} from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class CompleteLessonUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: CompleteLessonRequest): Observable<Result<LessonProgressResponse>> {
    return this.repository.completeLesson(request);
  }
}
