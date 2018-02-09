import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { Joueur } from './joueur';
import { TOURNOIS } from './mock-tournois';
import { TABLEAUX } from './mock-tournois';
import { INSCRITS } from './mock-tournois';
import { JOUEURS } from './mock-tournois';

@Injectable()
export class TournoiService {

  constructor() { }

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
    var t = TABLEAUX.filter(element => {
      return element.tournoi_id == tournoi_id;
    });
    return of(t);
  }

  getInscrits(tableau_id): Observable<Joueur[]> {
    var t: Joueur[] = INSCRITS.filter(element => {return element.tableau_id == tableau_id;}).map(element => element.joueur);
    return of(t);
  }

}

  