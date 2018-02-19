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
  joueur: Joueur = new Joueur("1", "3339022", "Stéphane", "Dubois", "M", "CAM Bordeaux", 940, 26547, "B2");
  
  tournoi: Tournoi;
  tableaux: Tableau[];
  options: any[] = [];
  
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
      this.options.push ({tournoi: this.tournoi, tableau: tableau, value: tableau._id, checked:i.findIndex(i => i._id == this.joueur._id) != -1});
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
  template: `<input [disabled]="disabledCheckbox(option.checked)" type="checkbox" name="options" value="{{option.value}}" [(ngModel)]="option.checked" />`,
  styleUrls: []
})
export class InscriptionTableauComponent implements OnInit {
  constructor(private tournoiService: TournoiService) { }  
    @Input() option;
    @Input() options;
    @Input() joueur: Joueur;
    nombre_inscrits: number;

    ngOnInit() {
      this.getInscrits(this.option.tableau);
    }

    getInscrits(tableau): void {
      this.tournoiService.getInscrits(tableau._id).subscribe(i => {
        this.nombre_inscrits = i.length;
      })
    }

    isTableauComplet():boolean {
      return this.nombre_inscrits >= this.option.tableau.nb_max ;
    }

    inscriptionPossible():boolean {
      return (this.joueur.classement >= this.option.tableau.cl_min && this.joueur.classement <= this.option.tableau.cl_max && !this.isTableauComplet())
    }

    disabledCheckbox(checked):boolean {
      // La checkbox est disabled si:
      // - le classement du joueur est inférieur au classement minimum autorisé OU
      // - le classement du joueur est supérieur au classement maximum autorisé OU
      // - le numero du joueur est inférieur au numéro maximum autorisé OU
      // - le tableau est complet ET le joueur n'est pas encore inscrit (case non cochée) OU
      // - le sexe du joueur n'est pas autorisé OU
      // - la catégorie du joueur n'est pas autorisée OU
      // - le tableau n'est pas compatible avec un tableau déjà choisi OU
      // - le nombre maximum de tableaux par jour est atteint ET le joueur n'est pas encore inscrit (case non cochée)
      return (
        this.joueur.points < this.option.tableau.cl_min || 
        this.joueur.points > this.option.tableau.cl_max || 
        this.joueur.numero < this.option.tableau.numero_max ||
        (this.isTableauComplet() && !checked) ||
        this.option.tableau.sexes.findIndex(s => s == this.joueur.sexe) == -1 ||
        this.option.tableau.categories.findIndex(c => c == this.joueur.categorie) == -1 ||
        !this.isTableauCompatible() ||
        (this.nbMaxTableauxAtteint() && !checked)
      )
    }

    private isTableauCompatible(): boolean {
      var compatible:boolean = true;
      this.option.tableau.tableaux_non_compatibles.forEach(element => {
        compatible = (compatible && (this.options.filter(opt => opt.checked).map(opt => opt.value).findIndex(o => o == element) == -1))
      });
      return compatible;
    }

    private nbMaxTableauxAtteint():boolean {
      var selectedOptionsJour = this.options.filter(opt => opt.checked && opt.tableau.date_debut.getTime() == this.option.tableau.date_debut.getTime())
      var nbTableauxJour = this.option.tournoi.nb_tableaux_max_par_jour.find(element=>element.jour.getTime() == this.option.tableau.date_debut.getTime()).nb
      return  selectedOptionsJour.length >= nbTableauxJour              
    }

}
