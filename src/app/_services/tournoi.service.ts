import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Joueur } from '../_models/joueur';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TournoiService {

  private tournoiUrl = '/api/tournoi';  // URL to web api

  constructor(private http: HttpClient) { }

  getTournois(): Observable<any> {
    return this.http.get<any>(this.tournoiUrl);
  }

  getTournoisAutour(position, km): Observable<any> {
    return this.http.get<any>(this.tournoiUrl);
  }

  searchTournois(search): Observable<any> {
    return this.http.get<any>(this.tournoiUrl + '/search?q=' + search);
  }

  getTournoi(id): Observable<any> {
    return this.http.get<any>(this.tournoiUrl + '/' + id);
  }

  saveInscription (tournoi_id, tableaux_ids: any[], joueur: Joueur): Observable<any> {
    return this.http.put(this.tournoiUrl + '/' + tournoi_id + '/inscription/' + joueur._id, tableaux_ids, httpOptions).pipe(
      tap(_ => this.log(`updated joueur id=${joueur._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  getJoueur(): Observable<any> {
    return this.http.get<any>('/api/joueur/5a980c65b3d7b82674cb28ad');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TournoiService message with the MessageService */
  private log(message: string) {
    //TODO: todo
  }
}

  