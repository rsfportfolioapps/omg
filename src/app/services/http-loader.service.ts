import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpLoaderService {
  public loader$: Observable<boolean>;

  private showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor() {
    this.loader$ = this.showLoader.asObservable();
  }
  public show(stats: boolean) {
    this.showLoader.next(stats);
  }
}
