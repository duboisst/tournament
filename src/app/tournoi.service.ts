import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';
import { TOURNOIS } from './mock-tournois';
import { TABLEAUX } from './mock-tournois';
import { INSCRITS } from './mock-tournois';
import { JOUEURS } from './mock-tournois';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TournoiService {

  private tournoiUrl = 'api/tournoi';  // URL to web api

  constructor(private http: HttpClient) { }

  getTournois(): Observable<Tournoi[]> {
    return of(TOURNOIS);
  }

  getTournoisAutour(position, km): Observable<Tournoi[]> {
    return of(TOURNOIS);
  }

  searchTournois(search): Observable<Tournoi[]> {
    var t: Tournoi[] = TOURNOIS.filter(element => {return  element.nom.search(new RegExp(search, 'i')) != -1;});
    return of(t);
  }

  getTournoi(id): Observable<Tournoi> {
    var t: Tournoi = TOURNOIS.find(element => {return element._id == id;});   
    return of(t);
  }

  getTableaux(tournoi_id): Observable<Tableau[]> {
    var t: Tableau[] = TABLEAUX.filter(element => {return element.tournoi_id == tournoi_id;});
    return of(t);
  }

  getInscrits(tableau_id): Observable<Joueur[]> {
    var t: Joueur[] = INSCRITS.filter(element => {return element.tableau_id == tableau_id;}).map(element => element.joueur);
    return of(t);
  }

  saveInscription (tableaux_ids: any[], joueur: Joueur): Observable<any> {
    while (INSCRITS.findIndex(i => i.joueur._id == joueur._id) != -1)
      INSCRITS.splice(INSCRITS.findIndex(i => i.joueur._id == joueur._id), 1);
    tableaux_ids.forEach(id=>
      INSCRITS.push({"tableau_id": id, "joueur": joueur})
    );
    return this.http.put(this.tournoiUrl, joueur, httpOptions).pipe(
      tap(_ => this.log(`updated joueur id=${joueur._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
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

  