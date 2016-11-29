import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { SpinnerService } from '../../spinner/service/spinner.service';

import { Hero } from '../model/hero.model';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(
    private spinnerService: SpinnerService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) {
    }

  ngOnInit(): void {
    this.spinnerService.start();
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => {
        this.hero = hero; this.spinnerService.stop();
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.name = this.hero.name.trim();
    this.spinnerService.start();
    this.heroService.update(this.hero).then(() => { this.goBack(); this.spinnerService.stop(); });
  }
}
