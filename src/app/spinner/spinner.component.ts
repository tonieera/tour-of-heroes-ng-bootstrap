import {Component} from '@angular/core';
import { SpinnerService} from './service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent {
  public active: boolean;

  public constructor(spinner: SpinnerService) {
    spinner.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }
}
