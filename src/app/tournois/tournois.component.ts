import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Add the RxJS Observable operators we need in this app.
import '../rxjs-operators';

import { ActivatedRoute, Params, Data, ParamMap  } from '@angular/router';

import { TournoiService } from '../_services/tournoi.service';

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css']
})

export class TournoisComponent implements OnInit {
  title: string;
  tournois: any[];
  loading:boolean;

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { 
    // The following code is here to make the component reload event if, only the param changed in the route
    route.params.subscribe(val => {

      // put the code from `ngOnInit` here
      switch (route.snapshot.data['navTo']) {
        case 'autour':
          var km = route.snapshot.params['km'];
          if (km) {        
            if (navigator.geolocation) { 
              navigator.geolocation.getCurrentPosition(position => {
                this.getTournoisAutour(position, km);
              });
            }
            else {
              alert('Impossible de déterminer votre position');
            }
          }
          break;
        case 'search':
          route.queryParamMap.subscribe(params => this.searchTournois(params.get('q')));
          break;
        case 'tous':
        case 'type':
        default:
          this.getTournois();
      }

    });
  }

  ngOnInit() {
  }

  getTournois(): void {
    var type = this.route.snapshot.params['type'];
    this.loading = true,
    this.tournoiService.getTournois().subscribe(tournois => { 
      if (type) {
        this.tournois = tournois.filter(t => t.type == type);
        var nom_type: string;
        switch (type) {
          case 'I': {
              nom_type = "Internationaux";
              break;
          }
          case 'NA': {
              nom_type = "National A";
              break;
          }
          case 'NB': {
              nom_type = "National B";
              break;
          }
          case 'R': {
              nom_type = "Régionaux";
              break;
          }
          case 'D': {
              nom_type = "Départementaux";
              break;
          }
          default: {
              nom_type = "";
          }
        } 
        this.title = "Les tournois " + nom_type;
      }
      else {
        this.tournois = tournois;
        this.title = 'Tous les tournois';
      }
      this.loading = false;
    });
  }

  getTournoisAutour(position, km): void {
    this.loading = true;
    this.tournoiService.getTournoisAutour(position, km).subscribe(tournois => { 
      this.tournois = tournois;
      this.title = "Les tournois à moins de " + km + "km";
      this.loading = false;
    });
  }

  searchTournois(search: string): void {
    this.loading = true;
    this.tournoiService.searchTournois(search).subscribe(tournois => { 
      this.tournois = tournois;
      this.title = "Les tournois correspondant à \"" +  search + "\"";
      this.loading = false;
    });
  }

  dateDebut(tournoi): string {
    let d = new Date(tournoi.date_debut);
    return d.toLocaleDateString("fr-FR", {year: "numeric", month: "long", day: "numeric"});
  }

  jours(tournoi): string {
    var debut = new Date(tournoi.date_debut);
    var fin = new Date(tournoi.date_fin);
    var jours = [];
    for (var d = debut; d <= fin; d.setDate(d.getDate() + 1)) {
        jours.push(this.weekday(d.getDay()));
    }
    return jours.join(" - ");
  }

  labelClass(tournoi):string {
    switch(tournoi.type) { 
      case 'I': { 
        return 'label-danger';
    } 
    case 'NA': { 
        return 'label-warning';
      } 
      case 'NB': { 
        return 'label-warning';
      } 
      case 'R': { 
        return 'label-primary';
      } 
      case 'D': { 
        return 'label-default';
      } 
      default: { 
        return 'label-default';
      } 
    } 
  }

  private weekday(n): string {
    var weekday = new Array(7);
    weekday[0] =  "Dimanche";
    weekday[1] = "Lundi";
    weekday[2] = "Mardi";
    weekday[3] = "Mercredi";
    weekday[4] = "Jeudi";
    weekday[5] = "Vendredi";
    weekday[6] = "Samedi";
    
    return weekday[n];
  }    

}
