import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Tournoi } from './tournoi';
import { Tableau } from './tableau';
import { TOURNOIS } from './mock-tournois';
import { TABLEAUX } from './mock-tournois';

@Injectable()
export class TournoiService {

  constructor() { }

  getTournois(): Observable<Tournoi[]> {
    return of(TOURNOIS);
  }

  getTournoi(id): Observable<Tournoi> {
    var t: Tournoi = TOURNOIS.find(function(element) {
      return element._id == id;
    });
   
    return of(t);
  }

  getTableaux(tournoi_id): Observable<Tableau[]> {
    var t: Tableau[] = TABLEAUX.filter(function(element) {
      return element.tournoi_id == tournoi_id;
    });
    return of(t);
  }


}

