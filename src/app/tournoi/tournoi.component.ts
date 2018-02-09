import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular5-data-table';

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
  tableaux: any[];
  tableauxResource: any;

  tableauCount = 0;

  @ViewChild(DataTable) tableauxTable;

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.getTournoi(this.route.snapshot.params['id']);
  }

  getTournoi(id): void {
    this.tournoiService.getTournoi(id).subscribe(tournoi => {
      this.tournoi = tournoi
      this.getTableaux(this.route.snapshot.params['id']);
    });
  }

  getTableaux(tournoi_id): void {
    this.tournoiService.getTableaux(tournoi_id).subscribe(tableaux => {
      this.tableaux = this.display_tableaux(tableaux);
      this.tableauxResource = new DataTableResource(this.tableaux);
      this.tableauxResource.count().then(count => this.tableauCount = count);
    });
  }

  // Cette fonction ajoute des propriétés calculées au tableau
  private display_tableaux(tableaux): any[] {
    return  tableaux.map(t => {
      t['date_heure'] = t.date_debut.toLocaleDateString();
      this.getNombreInscrits(t);
      return t
    })
  }

  private getNombreInscrits(tableau): void {
    this.tournoiService.getInscrits(tableau._id).subscribe(i => {
      tableau['nombre_inscrits'] = i.length;
      tableau['complet'] = i.length >= tableau.nb_max;
    })
  }

  reloadTableaux(params) {
    this.tableauxResource.query(params).then(tableaux => this.tableaux = tableaux);
  }

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
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

