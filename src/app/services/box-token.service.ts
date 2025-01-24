import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxTokenService {

  private boxTokenSubject = new BehaviorSubject<string>('');
  boxToken$ = this.boxTokenSubject.asObservable();

  setBoxToken(arg0: string) {
    this.boxTokenSubject.next(arg0)
  }

  getBoxToken(): string {
    return this.boxTokenSubject.value;
  }
}
