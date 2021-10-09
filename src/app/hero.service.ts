import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, forkJoin, lastValueFrom, map, mergeMap, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { Film } from './film';

@Injectable({
  providedIn: 'root',
 })
export class HeroService {

  private baseUrl: string = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  async getHeroes(heroName: string): Promise<Film[]> {
    const films: Film[] = [];

    const filmResults = await lastValueFrom(this.http.get(this.baseUrl + 'people').pipe(
      map((x: any) => x.results.filter(h => h.name.toUpperCase().includes(heroName.toUpperCase())))
    ));

    if (!!filmResults) {
      for (const filmResult of filmResults) {
        for (const filmUrl of filmResult.films) {
          console.log(filmUrl);
          const film: any = await lastValueFrom(this.http.get(filmUrl));
          if (films.findIndex(f => f.title === film.title) === -1){
            films.push({ title: film.title, release_date: film.release_date });
          }
        }
      }
    }

    return films;
  }
}