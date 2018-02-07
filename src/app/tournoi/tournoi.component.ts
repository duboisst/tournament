import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournoi } from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  tournoi: Tournoi;
  tableaux: any[];

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTournoi(this.route.snapshot.params['id']);
    this.getTableaux(this.route.snapshot.params['id']);
  }

  getTournoi(id): void {
    this.tournoiService.getTournoi(id).subscribe(tournoi => this.tournoi = tournoi);
  }

  getTableaux(id) {
    this.tableaux = [
      {"nom": "Tableau A", "description": "de 500 à 999 points", "cl_min": 500, "cl_max": 999, "date_debut": "05/10/2018 10:00", "nb_max": 48},
      {"nom": "Tableau B", "description": "de 1400 à N°300", "cl_min": 1400, "cl_max": 2250, "date_debut": "05/10/2018 11:00", "nb_max": 96},
    ];

  }

  tableauComplet(tableau):boolean {
    return true;
  }

  nombreInscrits(tableau) {
    return 10;
  }

  heureDebut(tableau) {
    var debut = new Date(tableau.date_debut);
    return debut.toLocaleString();
  }

}
