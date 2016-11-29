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

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.getHeroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.updateHeroUrl}/${hero.id}`;
      return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.createHeroUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    let url = `${this.deleteHeroUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(term: string): Observable<Hero[]> {
    let url = `${this.searchHeroUrl}/?name=${term}`;
    return this.http
      .get(url)
      .map((r: Response) => r.json().data as Hero[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
