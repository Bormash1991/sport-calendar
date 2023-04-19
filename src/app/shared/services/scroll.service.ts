import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scroll$ = new Subject<boolean>();

  setScroll(val: boolean) {
    this.scroll$.next(val);
  }
  getScroll() {
    return this.scroll$.asObservable();
  }
}
