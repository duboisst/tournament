import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Joueur } from '../_models/joueur';
import { TournoiService } from '../_services/tournoi.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  // TODO: implémenter système d'authentification
  joueur: Joueur = new Joueur("5a98627d360f273e94992e1c", "3339022", "Stéphane", "Dubois", "M", "CAM Bordeaux", 940, 26547, "B2");
  
  tournoi: any = {};
  jours: Date[];
  
  constructor(private tournoiService: TournoiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getTournoi(this.route.snapshot.params['id']);
  }

  getTournoi(id): void {
    this.tournoiService.getTournoi(id).subscribe(tournoi => {
      this.tournoi = tournoi;
      tournoi.tableaux.sort(function(a, b) {
        if (new Date(a.date_heure_debut).getTime() > new Date(b.date_heure_debut).getTime()) return 1;
        if (new Date(a.date_heure_debut).getTime() < new Date(b.date_heure_debut).getTime()) return -1;
        if (a.nom > b.nom) return 1;
        if (a.nom < b.nom) return -1;
        return 0;
      });
      tournoi.tableaux.forEach(tableau=>tableau.checked = tableau.inscrits.findIndex(i => i._id == this.joueur._id) != -1);
      this.jours = this.getJours();
    });
  }

  goBack(): void {
    this.location.back();
  }


  private getJours() {
    var arr = this.tournoi.tableaux.map(t=>new Date(t.date_debut));
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

  formatJour(d: Date):string {
    return d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).charAt(0).toUpperCase() + d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).slice(1);
  }
  
  tableauxJour(jour: Date) {
    return this.tournoi.tableaux.filter(t => new Date(t.date_debut).getTime() == jour.getTime());
  }

  get selectedOptions() {
    return this.tournoi.tableaux
      .filter(t => t.checked)
      .map(t => t._id)
  }

  get nbTableaux() {
    return this.tournoi.tableaux
    .filter(t => t.checked).length
  }

  get prixTotal() {
    return this.nbTableaux > 0 ?
            this.tournoi.tableaux.filter(t => t.checked).map(t => t.tarif).reduce(function(a,v) {return a+v}) :
            0
  }

  saveInscription():void {
    this.tournoiService.saveInscription(this.tournoi._id, this.selectedOptions, this.joueur).subscribe(() => {
      this.goBack();
    })
  }

  maxTableaux(jour: Date):string {   
    let max = this.tournoi.nb_tableaux_max_par_jour.find(element=>new Date(element.jour).getTime() == jour.getTime()).nb
    if (max == 1)
      return max.toString() + ' tableau'
    else
      return max.toString() + ' tableaux'
  }

  tableauxAvecTableauxIncompatibles(jour: Date):any[] {
    return this.tournoi.tableaux.filter(t=>t.tableaux_non_compatibles.length!=0 && new Date(t.date_debut).getTime() == jour.getTime());
  }

  tableauxNonCompatibles(t):string {
    return t.tableaux_non_compatibles.map(element=>this.tournoi.tableaux.find(x=>x._id==element).nom).join(' ni ');
  }

  heureDebut(tableau): string {
    var debut = new Date(tableau.date_heure_debut);
    return ("0" + debut.getHours()).slice(-2) + "h" + ("0" + debut.getMinutes()).slice(-2);    
  }
}


@Component({
  selector: 'app-inscription-tableau',
  template: `<input [disabled]="disabledCheckbox(tableau.checked)" type="checkbox" name="tableaux" value="{{tableau._id}}" [(ngModel)]="tableau.checked" />`,
  styleUrls: []
})
export class InscriptionTableauComponent implements OnInit {
  constructor(private tournoiService: TournoiService) { }  
  
  @Input() joueur: Joueur;
  @Input() tableau;
  @Input() tournoi;

  nombre_inscrits: number;

  ngOnInit() {
    this.nombre_inscrits = this.tableau.inscrits.length;
  }

  isTableauComplet():boolean {
    return this.nombre_inscrits >= this.tableau.nb_max ;
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
      this.joueur.points < this.tableau.cl_min || 
      this.joueur.points > this.tableau.cl_max || 
      this.joueur.numero < this.tableau.numero_max ||
      (this.isTableauComplet() && !checked) ||
      this.tableau.sexes.findIndex(s => s == this.joueur.sexe) == -1 ||
      this.tableau.categories.findIndex(c => c == this.joueur.categorie) == -1 ||
      !this.isTableauCompatible() ||
      (this.nbMaxTableauxAtteint() && !checked)
    )
  }

  private isTableauCompatible(): boolean {
    var compatible:boolean = true;
    this.tableau.tableaux_non_compatibles.forEach(element => {
      compatible = (compatible && (this.tournoi.tableaux.filter(t => t.checked).map(t =>t._id).findIndex(o => o == element) == -1))
    });
    return compatible;
  }

  private nbMaxTableauxAtteint():boolean {
    var selectedOptionsJour = this.tournoi.tableaux.filter(t => t.checked && new Date(t.date_debut).getTime() == new Date(this.tableau.date_debut).getTime())
    var nbTableauxJour = this.tournoi.nb_tableaux_max_par_jour.find(element=>new Date(element.jour).getTime() == new Date(this.tableau.date_debut).getTime()).nb
    return  selectedOptionsJour.length >= nbTableauxJour              
  }

}
