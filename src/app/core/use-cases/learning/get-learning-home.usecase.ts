import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningHomeResponse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class GetLearningHomeUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(): Observable<Result<LearningHomeResponse>> {
    return this.repository.getHome();
  }
}
