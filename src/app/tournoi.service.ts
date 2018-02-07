import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Tournoi } from './tournoi';
import { TOURNOIS } from './mock-tournois';

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


}

