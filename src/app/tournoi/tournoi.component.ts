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

  heureDebut(tableau): string {
    var debut = new Date(tableau.date_debut);
    return debut.toLocaleString();
  }

}

@Component({
  selector: 'app-nbinscrits',
  template: `<span>{{ nombre_inscrits }}</span> <span *ngIf="isTableauComplet()" class="label label-danger">complet</span>`,
  styleUrls: []
})
export class NbInscritsComponent implements OnInit {
  constructor(private tournoiService: TournoiService) { }
    @Input() tableau: Tableau;
    nombre_inscrits: number;

    ngOnInit() {
      this.getNombreInscrits(this.tableau);
    }

    getNombreInscrits(tableau): void {
      this.tournoiService.getInscrits(tableau._id).subscribe(i => this.nombre_inscrits = i.length)
    }

    isTableauComplet():boolean {
      return this.nombre_inscrits >= this.tableau.nb_max ;
    }
  
}