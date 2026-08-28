import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export type FilterStateKey = 'budgets' | 'graphics' | 'transactions';

@Injectable({ providedIn: 'root' })
export class FeatureFilterStateService {
  private readonly states = new Map<FilterStateKey, unknown>();
  private readonly resetSubject = new Subject<FilterStateKey>();

  get<T>(key: FilterStateKey): T | null {
    const state = this.states.get(key);
    return state ? ({ ...(state as object) } as T) : null;
  }

  set<T extends object>(key: FilterStateKey, state: T): void {
    this.states.set(key, { ...state });
  }

  reset(key: FilterStateKey): void {
    this.states.delete(key);
    this.resetSubject.next(key);
  }

  resetsFor(key: FilterStateKey): Observable<void> {
    return this.resetSubject.pipe(
      filter(resetKey => resetKey === key),
      map(() => undefined)
    );
  }
}
