import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SpinnerService } from '../spinner/service/spinner.service';

import { Hero } from './model/hero.model';
import { HeroService } from './service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @ViewChild('viewDetails') viewDetails: ElementRef;
  @ViewChild('newHeroName') newHeroName: ElementRef;

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private heroService: HeroService,
    private renderer: Renderer) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.spinnerService.start();
    this.heroService.getHeroes().then(heroes => { this.heroes = heroes; this.spinnerService.stop(); });
  }

  add(name: string) {
    name = name.trim();
    this.spinnerService.start();
    this.heroService.create(name).then(hero => {
      console.log('New hero: ' + hero);
      this.heroes.push(hero);
      this.selectedHero = null;
      this.spinnerService.stop();
      this.renderer.invokeElementMethod(this.newHeroName.nativeElement, 'select');
    });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    if (this.viewDetails != null) {
      this.renderer.invokeElementMethod(this.viewDetails.nativeElement, 'focus');
    }
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  delete(hero: Hero): void {
    this.spinnerService.start();
    this.heroService.delete(hero.id).then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      };
      this.spinnerService.stop();
      this.renderer.invokeElementMethod(this.newHeroName.nativeElement, 'select');
    });
  }
}
