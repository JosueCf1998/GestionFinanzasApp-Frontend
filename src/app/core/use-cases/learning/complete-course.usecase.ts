import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CompleteCourseRequest,
  LessonProgressResponse
} from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class CompleteCourseUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: CompleteCourseRequest): Observable<Result<LessonProgressResponse>> {
    return this.repository.completeCourse(request);
  }
}
