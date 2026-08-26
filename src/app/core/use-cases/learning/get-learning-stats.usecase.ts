import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningStatsResponse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class GetLearningStatsUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(): Observable<Result<LearningStatsResponse>> {
    return this.repository.getStats();
  }
}
