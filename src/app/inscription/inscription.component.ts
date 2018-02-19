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
  options: any[] = [];
  
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
    this.tournoiService.getTableaux(tournoi_id).subscribe(tableaux => {
      this.tableaux = tableaux
      this.tableaux.forEach(t => {
        this.getInscrits(t);
      });
    });
  }

  getInscrits(tableau): void {
    this.tournoiService.getInscrits(tableau._id).subscribe(i => {
      this.options.push ({tableau: tableau, value: tableau._id, checked:i.findIndex(i => i._id == this.joueur._id) != -1});
    })
  }

  goBack(): void {
    this.location.back();
  }

  get selectedOptions() {
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  get nbTableaux() {
    return this.options
    .filter(opt => opt.checked).length
  }

  get prixTotal() {
    return this.nbTableaux > 0 ?
            this.options.filter(opt => opt.checked).map(opt => opt.tableau.tarif).reduce(function(a,v) {return a+v}) :
            0
  }

  saveInscription():void {
    this.tournoiService.saveInscription(this.selectedOptions, this.joueur).subscribe(() => {
      this.goBack();
    })
  }

}


@Component({
  selector: 'app-inscription-tableau',
  template: `
  <input [disabled]="disabledCheckbox()" type="checkbox" name="options" value="{{option.value}}" [(ngModel)]="option.checked" />
  `,
  styleUrls: []
})
export class InscriptionTableauComponent implements OnInit {
  constructor(private tournoiService: TournoiService) { }  
    @Input() option ;
    @Input() joueur: Joueur;
    nombre_inscrits: number;
    inscrits: Joueur[];

    ngOnInit() {
      this.getInscrits(this.option.tableau);
    }

    getInscrits(tableau): void {
      this.tournoiService.getInscrits(tableau._id).subscribe(i => {
        this.nombre_inscrits = i.length;
        this.inscrits = i;
      })
    }

    isTableauComplet():boolean {
      return this.nombre_inscrits >= this.option.tableau.nb_max ;
    }

    inscriptionPossible():boolean {
      return (this.joueur.classement >= this.option.tableau.cl_min && this.joueur.classement <= this.option.tableau.cl_max && !this.isTableauComplet())
    }

    disabledCheckbox():boolean {
      // La checkbox est disabled si:
      // - le classement du joueur est inférieur au classement minimum autorisé OU
      // - le classement du joueur est supérieur au classement maximum autorisé OU
      // - le tableau est complet ET le joueur n'est pas encore inscrit
      return (
        this.joueur.classement < this.option.tableau.cl_min || 
        this.joueur.classement > this.option.tableau.cl_max || 
        (this.isTableauComplet() && this.inscrits.findIndex(i => i._id == this.joueur._id) == -1)
      )
    }

}
