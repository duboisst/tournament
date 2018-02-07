import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournoi } from '../tournoi';
import { Tableau } from '../tableau';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  tournoi: Tournoi;
  tableaux: Tableau[];

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTournoi(this.route.snapshot.params['id']);
    this.getTableaux(this.route.snapshot.params['id']);
  }

  getTournoi(id): void {
    this.tournoiService.getTournoi(id).subscribe(tournoi => this.tournoi = tournoi);
  }

  getTableaux(tournoi_id): void {
    this.tournoiService.getTableaux(tournoi_id).subscribe(tableaux => this.tableaux = tableaux);
  }

  nombreInscrits(tableau): number {
    var n: number = 10000;
    this.tournoiService.getInscrits(tableau._id).subscribe(i => n = i.length)
    return n;
  }

  tableauComplet(tableau):boolean {
    return this.nombreInscrits(tableau) >= tableau.nb_max ;
  }

  heureDebut(tableau): string {
    var debut = new Date(tableau.date_debut);
    return debut.toLocaleString();
  }

}
