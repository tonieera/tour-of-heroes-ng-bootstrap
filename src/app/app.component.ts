import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  public isNavbarCollapsed = true;
}
