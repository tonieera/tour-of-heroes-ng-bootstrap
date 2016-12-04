import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SpinnerService {

  public status: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private active: boolean = false;

  // public get active(): boolean {
  //   return this._active;
  // }

  // public set active(value: boolean) {
  //   this._active = value;
  //   this.status.next(value);
  // }

  public start(): void {
    this.active = true;
    this.status.next(true);
  }

  public stop(): void {
    this.active = false;
    this.status.next(false);
  }
}
