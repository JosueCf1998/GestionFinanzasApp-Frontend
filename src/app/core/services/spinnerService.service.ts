// spinner.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.setLoading(true);
  }

  hide(): void {
    this.setLoading(false);
  }

  private setLoading(value: boolean): void {
    queueMicrotask(() => {
      if (this.loadingSubject.value !== value) {
        this.loadingSubject.next(value);
      }
    });
  }
}
