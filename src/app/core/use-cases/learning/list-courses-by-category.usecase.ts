import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesByCategoryRequest, LearningCourse, LearningItemsResponse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class ListCoursesByCategoryUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: CoursesByCategoryRequest): Observable<Result<LearningItemsResponse<LearningCourse>>> {
    return this.repository.getCoursesByCategory(request);
  }
}
