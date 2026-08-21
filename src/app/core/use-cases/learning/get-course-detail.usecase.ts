import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetailRequest, LearningCourse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class GetCourseDetailUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: CourseDetailRequest): Observable<Result<LearningCourse>> {
    return this.repository.getCourseDetail(request);
  }
}
