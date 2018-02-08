import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournoi } from '../tournoi';
import { TournoiService } from '../tournoi.service';

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css']
})

export class TournoisComponent implements OnInit {
  title: string = 'Tous les tournois';
  tournois: Tournoi[];

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute) { 
    // The following code is here to make the component reload event if only the param changed in the route
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      var km = this.route.snapshot.params['km'];
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
      else {
        this.getTournois();
      }
    });
  }

  ngOnInit() {
    
  }

  getTournois(): void {
    var type = this.route.snapshot.params['type'];
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
      }
    });
  }

  getTournoisAutour(position, km): void {
    this.tournoiService.getTournoisAutour(position, km).subscribe(tournois => { 
      this.tournois = tournois;
      this.title = "Les tournois à moins de " + km + "km";
    });
  }

}
