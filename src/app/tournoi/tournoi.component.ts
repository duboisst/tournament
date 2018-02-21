import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournoi } from '../_models/tournoi';
import { Tableau } from '../_models/tableau';
import { TournoiService } from '../_services/tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  tournoi: Tournoi;
  tableaux: Tableau[];
  jours: Date[];

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
    this.jours = this.getJours();
  }

  private getJours() {
    var arr = this.tableaux.map(t=>t.date_debut).sort(function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if (i==0){
            unique_array.push(arr[i])
        }
        else {
          if (arr[i].getTime() != arr[i-1].getTime()) {
            unique_array.push(arr[i])
          }
        }
    }
    return unique_array;
  }

  tableauxJour(jour: Date) {
    return this.tableaux.filter(t => t.date_debut.getTime() == jour.getTime());
  }

  formatJour(d: Date):string {
    return d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).charAt(0).toUpperCase() + d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).slice(1);
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