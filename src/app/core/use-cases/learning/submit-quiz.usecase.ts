import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmitQuizRequest, SubmitQuizResponse } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class SubmitQuizUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(request: SubmitQuizRequest): Observable<Result<SubmitQuizResponse>> {
    return this.repository.submitQuiz(request);
  }
}
