import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

import { Hero } from '../model/hero.model';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private heroesApiUrl = environment.heroesApiUrl;
  private getHeroesUrl = this.heroesApiUrl + '/api/heroes';
  private createHeroUrl = this.heroesApiUrl + '/api/create-hero';
  private updateHeroUrl = this.heroesApiUrl + '/api/update-hero';
  private deleteHeroUrl = this.heroesApiUrl + '/api/delete-hero';
  private searchHeroUrl = this.heroesApiUrl + '/api/hero-search';

  constructor(private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get(this.getHeroesUrl)
      .map((res: Response) => res.json().data as Hero[])
      .catch((error: any) => Observable.throw(error));
  }

  getHeroesSlowly(): Observable<Hero[]> {
    return this.http
      .get(this.getHeroesUrl)
      .map((res: Response) => res.json().data as Hero[])
      .delay(2000)
      .catch((error: any) => Observable.throw(error));
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().map(heroes => heroes.filter(hero => hero.id === id)[0]);
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.updateHeroUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .map((res: Response) => res.json().data as Hero[])
      .catch((error: any) => Observable.throw(error));
  }

  create(name: string): Observable<Hero> {
    return this.http
      .post(this.createHeroUrl, JSON.stringify({name: name}), {headers: this.headers})
      .map((res: Response) => res.json() as Hero[])
      .catch((error: any) => Observable.throw(error));
  }

  delete(id: number): Observable<void> {
    let url = `${this.deleteHeroUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((res: Response) => null)
      .catch((error: any) => Observable.throw(error));
  }

  search(term: string): Observable<Hero[]> {
    let url = `${this.searchHeroUrl}/?name=${term}`;
    return this.http
      .get(url)
      .map((r: Response) => r.json().data as Hero[]);
  }
}
