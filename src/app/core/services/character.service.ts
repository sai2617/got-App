import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private apiService: ApiService) {}

  getCharacter(url: string): Observable<Character | null> {
    const endpoint = url.replace('https://anapioficeandfire.com/api', '');
    return this.apiService.get<Character>(endpoint).pipe(
      catchError(() => of(null))
    );
  }

  getCharactersByUrls(urls: string[]): Observable<Character[]> {
    if (urls.length === 0) {
      return of([]);
    }

    const limitedUrls = urls.slice(0, 40);
    const requests = urls.map(url => this.getCharacter(url));

    return forkJoin(requests).pipe(
      map(characters => characters.filter(char => char !== null) as Character[]),
      catchError(() => of([]))
    );
  }
}
