import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { SpinnerService } from '../../spinner/service/spinner.service';
import { ErrorService } from '../../error/service/error.service';

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
    private errorService: ErrorService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) {
    }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.spinnerService.start();
        return this.heroService.getHero(+params['id'])
          .finally(() => this.spinnerService.stop());
      })
      .subscribe(
        hero => this.hero = hero,
        error => this.errorService.publishError(error)
      );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.name = this.hero.name.trim();
    this.spinnerService.start();
    this.heroService.update(this.hero)
      .finally(() => this.spinnerService.stop())
      .subscribe(
        () => this.goBack(),
        error => this.errorService.publishError(error)
      );
  }
}
