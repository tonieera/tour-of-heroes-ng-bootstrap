import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '../spinner/service/spinner.service';

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
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.heroService.getHeroes().then(heroes => { this.heroes = heroes.slice(1, 5); this.spinnerService.stop(); });
  }
}
