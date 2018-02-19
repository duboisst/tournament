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

  get jours() {
    return this.tournoi.nb_tableaux_max_par_jour.sort(function(a, b) {
      if (a.jour > b.jour) return 1;
      if (a.jour < b.jour) return -1;
      return 0;
    }).map(element=>element.jour);
  }

  tableauxJour(jour: Date) {
    return this.tableaux.filter(t => t.date_debut.getTime() == jour.getTime());
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