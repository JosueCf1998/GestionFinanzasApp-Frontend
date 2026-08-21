import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningQuestion } from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { LearningRepository } from 'src/app/core/repositories/learning.repository';

@Injectable({ providedIn: 'root' })
export class ListLearningQuestionsUseCase {
  constructor(private readonly repository: LearningRepository) {}

  execute(): Observable<Result<LearningQuestion[]>> {
    return this.repository.getQuestions();
  }
}
