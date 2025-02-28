// src/app/core/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  setLoading(isLoading: boolean) {
    if (isLoading) {
      this.isLoadingSubject.next(true);
    } else {
      of(false).pipe(delay(1000)).subscribe({
        next: val => {
          this.isLoadingSubject.next(val); 
        }
      });
    }
  }
}
