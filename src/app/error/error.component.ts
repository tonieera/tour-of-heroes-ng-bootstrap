import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Messages} from './messages/messages';
import { ErrorService} from './service/error.service';
import { Error } from './model/error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  @ViewChild('errorModal') errorModal: TemplateRef<any>;

  error: Error = new Error();

  public constructor(private errors: ErrorService, private modal: NgbModal) {
  }

  ngOnInit() {
    this.errors.error.subscribe((error: any) => {
      this.setError(error);
      this.logError();
      this.modal.open(this.errorModal, { windowClass: 'error-modal' });
    });
  }

  ngOnDestroy() {
    this.errors.error.unsubscribe();
  }

  setError(error: any): void {

    this.error.code = Messages.INTERNAL_ERROR.code;
    this.error.message = Messages.INTERNAL_ERROR.message;
    this.error.detail = this.getErrorDetail(error);
  }

  getErrorDetail(error: any): string {
    let errorDetail: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorDetail =
        `OK: ${error.ok}, Status: ${error.status} (${error.statusText || ''}), Type: ${error.type}, URL: ${error.url}, Body: ${err}`;
    } else {
      errorDetail = error.message ? error.message : error.toString();
    }

    return errorDetail;
  }

  logError(): void {
      console.error('Error occured. Code: ' + this.error.code + ', Message: ' + this.error.message + ', Detail: ' + this.error.detail);
  }
}
