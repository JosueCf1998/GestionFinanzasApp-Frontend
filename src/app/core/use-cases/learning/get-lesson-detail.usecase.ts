import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningLesson, LessonRequest } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class GetLessonDetailUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: LessonRequest): Observable<Result<LearningLesson>> {
    return this.repository.getLessonDetail(request);
  }
}
