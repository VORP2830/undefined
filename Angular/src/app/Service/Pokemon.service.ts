import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Pokemon } from '../Models/Pokemon';


@Injectable()
export class PokemonService {

  baseUrl = `http://localhost:5182/api/Pokemon`

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseUrl}/`).pipe(take(1));
  }

  public getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public post(Pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.baseUrl}/`, Pokemon).pipe(take(1));
  }

  public put(Pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.baseUrl}/`, Pokemon).pipe(take(1));
  }

  public delete(id: number): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

}
