import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tournoi } from '../tournoi';
import { Joueur } from '../joueur';
import { Tableau } from '../tableau';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  // TODO: implémenter système d'authentification
  joueur: Joueur = new Joueur("1", "3339022", "Stéphane", "Dubois", "CAM Bordeaux", 940, "V1");
  
  tournoi: Tournoi;
  tableaux: Tableau[];

  //TODO : implémenter méthode qui permet de récupérer le classement en points ou en numéro
  classement = this.joueur.classement + " points";

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute, private location: Location) { }

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

  goBack(): void {
    this.location.back();
  }

  saveInscription():void {
    this.tournoiService.saveInscription([], this.joueur).subscribe(() => {
      alert('sauvé');
      this.goBack();
    })
  }

}


@Component({
  selector: 'app-inscription-tableau',
  template: `
  <div class="col-md-1"><input *ngIf="inscriptionPossible(tableau)" type="checkbox" [checked]="isInscrit()" /></div>  
  <div class="col-md-3">{{ heureDebut(tableau) }}</div>
  <div class="col-md-3">{{ tableau.nom }}</div>
  <div class="col-md-3">{{ tableau.description }}</div>
  <div class="col-md-2"><app-nbinscrits [tableau] = "tableau"></app-nbinscrits></div>`,
  styleUrls: []
})
export class InscriptionTableauComponent implements OnInit {
  constructor(private tournoiService: TournoiService) { }
    @Input() tableau: Tableau;
    @Input() joueur: Joueur;
    nombre_inscrits: number;
    inscrits: Joueur[];

    @Output('addTableauEvent') 
	  addTableauId = new EventEmitter<string>();

    ngOnInit() {
      this.getNombreInscrits(this.tableau);
    }

    getNombreInscrits(tableau): void {
      this.tournoiService.getInscrits(tableau._id).subscribe(i => {
        this.nombre_inscrits = i.length;
        this.inscrits = i;
      })
    }

    isTableauComplet():boolean {
      return this.nombre_inscrits >= this.tableau.nb_max ;
    }

    heureDebut(): string {
      var debut = new Date(this.tableau.date_debut);
      return debut.toLocaleString();
    }
 
    inscriptionPossible():boolean {
      return (this.joueur.classement >= this.tableau.cl_min && this.joueur.classement <= this.tableau.cl_max && !this.isTableauComplet())
    }

    isInscrit(): boolean {
      return this.inscrits.findIndex(i => i._id == this.joueur._id) != -1
    }

    addTableau() {
      this.addTableauId.emit(this.tableau._id);
      }

}
