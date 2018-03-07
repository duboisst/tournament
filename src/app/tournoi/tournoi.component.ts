import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TournoiService } from '../_services/tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  //template:`{{tournoi.nom}}`,
  styleUrls: ['./tournoi.component.css']
})
export class TournoiComponent implements OnInit {
  tournoi: any;
  jours: Date[];

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { }

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
      this.jours = this.getJours();
    });
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

  tableauxJour(jour: Date) {
    return this.tournoi.tableaux.filter(t => new Date(t.date_debut).getTime() == jour.getTime());
  }

  formatJour(d: Date):string {
    return d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).charAt(0).toUpperCase() + d.toLocaleDateString("fr-FR", {weekday: "long", month: "long", day: "numeric"}).slice(1);
  }

  heureDebut(tableau): string {
    var debut = new Date(tableau.date_heure_debut);
    return ("0" + debut.getHours()).slice(-2) + "h" + ("0" + debut.getMinutes()).slice(-2);    
  }

}
