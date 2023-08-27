import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public checker = true;
  constructor() {}
  private emitChangeSource = new BehaviorSubject<any>({ loader: this.checker });

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(check: any) {
    let x = { loader: null };
    x.loader = check;
    this.emitChangeSource.next(x);
  }
}
