import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '../spinner/service/spinner.service';
import { ErrorService } from '../error/service/error.service';

import { Hero } from '../heroes/model/hero.model';
import { HeroService } from '../heroes/service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private spinnerService: SpinnerService,
              private errorService: ErrorService,
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.heroService.getHeroes()
      .finally(() => this.spinnerService.stop())
      .subscribe(
        heroes => { this.heroes = heroes.slice(1, 5); },
        error => this.errorService.publishError(error)
      );
  }
}
