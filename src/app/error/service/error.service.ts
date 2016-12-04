import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ErrorService {

  public error: ReplaySubject<any> = new ReplaySubject<any>(1);

  public publishError(error: any): void {
    this.error.next(error);
  }
}
