import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService} from './service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit, OnDestroy {
  public active: boolean;

  public constructor(private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }

  ngOnDestroy() {
    this.spinner.status.unsubscribe();
  }
}
