import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningRecommendationsResponse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class GetLearningRecommendationsUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(): Observable<Result<LearningRecommendationsResponse>> {
    return this.repository.getRecommendations();
  }
}
